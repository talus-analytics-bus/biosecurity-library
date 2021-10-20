/**
 * Helper functions for preparing resource map data.
 *
 * Note: The following methods and types should be refactored into viz.network:
 *    getNeighborhood
 *    getLinksForNodesWithIds
 *    getNodeIdsForLinks
 *    LinkDirections
 */
import { PageContext } from '../../../../templates/Detail'
import {
  AppGraphData,
  GraphNode,
  GraphLink,
  // LinkDirections,
} from '@mvanmaele/mvanmaele-test.viz.network'
import * as urls from '../../../../utilities/urls'

/**
 * Define different directions of links.
 * TODO refactor into viz.network package
 */
export enum LinkDirections {
  source,
  target,
  both,
  either,
}

type DefinedPageDataFields = keyof Omit<PageContext['data'], 'resourceMapData'>

/**
 * Thrown when a node with the defined ID is expected to exist but not found
 */
class MissingNodeError extends Error {
  constructor(missingId: string) {
    super(
      `Expected to find node with record ID = ${missingId}, but none found.`
    )
  }
}

/**
 * Returns full resource map data object based on Airtable query result.
 *
 * Given a list of page context data objects from an Airtable query response,
 * and a list of field names that represent links between those objects (linked
 * record columns), returns the nodes and links to visualize a resource map of
 * all the objects.
 *
 * @param queryResponse All page context data objects returned from
 * Airtable query
 * @param edgeFields List of fields in each data object that define an edge
 * @param nameField Data object field that should be used as the node's name
 * @param idField Data object field that should be used as the node's unique ID
 * @returns The graph data represented by those objects, given edge field names
 */
export function getFullResourceMapData(
  queryResponse: { data: PageContext['data'] }[],
  linkFields: (keyof PageContext['data'])[],
  nameField: keyof Omit<PageContext['data'], 'resourceMapData'>, // omit undef
  idField: DefinedPageDataFields,
  iconField: DefinedPageDataFields
): AppGraphData {
  const nodes: GraphNode[] = []
  const links: GraphLink[] = []
  // create one node per query response datum
  queryResponse.forEach(({ data }) => {
    const node: GraphNode = initResourceMapNode(
      data,
      nameField,
      idField,
      iconField
    )
    nodes.push(node)
  })

  queryResponse.forEach(({ data }) => {
    const node: GraphNode | undefined = nodes.find(n => {
      return n._id === data[idField]
    })
    if (node === undefined) {
      throw new MissingNodeError(data[idField].toString())
    }

    // add one link per connection
    linkFields.forEach(lf => {
      if (
        data[lf] !== null &&
        typeof data[lf] === 'object' &&
        (data[lf] as string[]).length !== undefined
      ) {
        ;(data[lf] as string[]).forEach(rId => {
          const otherNode: GraphNode | undefined = nodes.find(n => {
            return n._id === rId
          })
          if (otherNode === undefined) throw new MissingNodeError(rId)
          links.push({ source: node._id, target: otherNode._id, value: 1 })
        })
      }
    })
  })

  return { nodes, links }
}

/**
 * Returns nodes/links for just the defined resource's resource map.
 * @param resourceId The ID of the resource for the purposes of the resource map
 * @param allResourceMapData Nodes and links data for all resources
 * @returns {AppGraphData} The nodes/links for just the defined resource
 */
export function getResourceMapData(
  resourceId: string,
  allResourceMapData: AppGraphData
): AppGraphData {
  const node: GraphNode | undefined = allResourceMapData.nodes.find(
    n => n._id === resourceId
  )
  if (node === undefined)
    throw new Error(
      `Resource with the following value for "_id" was expected in variable` +
        ` "allResourceMapData" but not found: ${resourceId}.`
    )

  // return { nodes: [], links: [] }
  return getNeighborhood(node, allResourceMapData, 1)
}

/**
 * Create a node for a resource map based on the resource's Airtable data.
 * @param data The query response datum on which to base the node
 * @param nameField The datum field that should be used as the node's name
 * @param idField The datum field that should be used as the node's unique ID
 * @returns The initialized node
 */
export function initResourceMapNode(
  data: PageContext['data'],
  nameField: keyof Omit<PageContext['data'], 'resourceMapData'>, // omit undef
  idField: DefinedPageDataFields,
  iconField?: DefinedPageDataFields
): GraphNode {
  return {
    url: urls.getDetailURL(data),
    _label: data[nameField].toString(),
    _id: data[idField].toString(),
    _color: '#063968', // TODO dynamically define color from design
    _shape: 'circle',
    _nodeType: 'default',
    _show: true,
    _fontSize: 16,
    _icon: iconField !== undefined ? data[iconField].toString() : '',
    _showLabel: true,
    _labelPos: 'bottom',
    _size: 1,
  }
}

/**
 * Returns the node's neighbors to the specified degree, including all links
 * @param node The node
 * @param allowedNeighborDepth The maximum degree of neighbor to include,
 * defaults to 1
 * @returns The graph data for the node's neighborhood
 */
function getNeighborhood(
  node: GraphNode,
  graphData: AppGraphData,
  allowedNeighborDepth: number = 1
): AppGraphData {
  if (allowedNeighborDepth === 0)
    return {
      nodes: [node],
      links: getLinksForNodesWithIds(
        [node._id],
        graphData.links,
        LinkDirections.both
      ),
    }

  let shownLinks: GraphLink[] = []
  let checkedNodesIds: (string | number)[] = [node._id]
  let neighborLevel: number = 0
  let primaryNodesIds: (string | number)[] = [node._id]
  while (neighborLevel < allowedNeighborDepth) {
    // Get all links for the current primary set and
    // add them to the set of visible links
    const allPrimaryLinks: GraphLink[] = getLinksForNodesWithIds(
      primaryNodesIds,
      graphData.links,
      LinkDirections.either
    )
    shownLinks = shownLinks.concat(allPrimaryLinks)

    // get node IDs from primary links that aren't already in the visible
    // node set and add them
    // N/A

    // set the current primary set equal to all nodes in shown links that
    // were not already in the checked nodes list

    const secondaryNodesIds: (string | number)[] = getNodeIdsForLinks(
      shownLinks
    ).filter(
      // eslint-disable-next-line no-loop-func
      nId => !primaryNodesIds.includes(nId) && !checkedNodesIds.includes(nId)
    )

    const allSecondaryLinks: GraphLink[] = getLinksForNodesWithIds(
      secondaryNodesIds,
      graphData.links,
      LinkDirections.both
    )
    shownLinks = shownLinks.concat(allSecondaryLinks)

    // update the checked nodes list
    checkedNodesIds = [
      ...new Set([
        ...primaryNodesIds,
        ...secondaryNodesIds,
        ...checkedNodesIds,
      ]),
    ]
    primaryNodesIds = secondaryNodesIds
    neighborLevel += 1
  }
  shownLinks.forEach(l => (l.color = undefined))

  // const ignoreNodeType: boolean =
  //   tableConfig === undefined || tableConfig.nodeTypes.length === 0

  let shownNodes: GraphNode[] = graphData.nodes
  graphData.nodes.forEach(n => {
    n._show = checkedNodesIds.includes(n._id)
  })
  shownNodes = graphData.nodes.filter(n => {
    return n._show
  })

  // if (!ignoreNodeType)
  //   tableConfig?.nodeTypes.forEach(nt => {
  //     if (!nt.config.hideUnselected) return
  //     graphData.nodes.forEach(n => {
  //       if (n._nodeType !== nt.name) return
  //       n._show = checkedNodesIds.includes(n._id)
  //     })
  //     shownNodes = graphData.nodes.filter(n => {
  //       return n._nodeType !== nt.name || n._show
  //     })
  //   })
  // else {
  //   graphData.nodes.forEach(n => {
  //     n._show = checkedNodesIds.includes(n._id)
  //   })
  //   shownNodes = graphData.nodes.filter(n => {
  //     return n._show
  //   })
  // }

  return { nodes: shownNodes, links: shownLinks }
}

/**
 * Returns the graph links that have a source and target with one of the
 * provided node IDs
 * @param ids The node ID(s)
 * @param linkDir The direction(s) for which the link must have an ID match.
 * Defaults to either.
 * @returns The links
 */
function getLinksForNodesWithIds(
  ids: (string | number)[],
  links: GraphLink[],
  linkDir: LinkDirections = LinkDirections.either
): GraphLink[] {
  // TODO Refactor method
  if (links.length === 0) return []
  const isStruct: boolean = (links[0].source as GraphNode)._id !== undefined
  const getHasId: (l: any, field: 'source' | 'target') => boolean = isStruct
    ? (l, field) => ids.includes((l[field] as GraphNode)._id)
    : (l, field) => ids.includes(l[field] as string)
  return links.filter(l => {
    const sourceHasId: boolean = getHasId(l, 'source')
    const targetHasId: boolean = getHasId(l, 'target')
    if (linkDir === LinkDirections.both) return sourceHasId && targetHasId
    if (linkDir === LinkDirections.either) return sourceHasId || targetHasId
    if (linkDir === LinkDirections.source) return sourceHasId
    if (linkDir === LinkDirections.target) return targetHasId
    return false
  })
}
/**
 * Given a list of graph links, returns the node IDs for all sources and
 * targets of those links as a unique list.
 * @param links The links
 * @returns The list of IDs
 */
function getNodeIdsForLinks(links: GraphLink[]): (string | number)[] {
  // TODO Refactor method
  if (links.length === 0) return []
  const isStruct: boolean = (links[0].source as GraphNode)._id !== undefined
  return isStruct
    ? [
        ...new Set(
          links
            .map(n => [
              (n.source as GraphNode)._id,
              (n.target as GraphNode)._id,
            ])
            .flat()
        ),
      ]
    : [
        ...new Set(
          links.map(n => [n.source as string, n.target as string]).flat()
        ),
      ]
}
