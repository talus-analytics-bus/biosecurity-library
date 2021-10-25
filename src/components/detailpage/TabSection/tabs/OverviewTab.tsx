import React from 'react'
import * as network from '@mvanmaele/mvanmaele-test.viz.network'

import TabContentContainer from '../TabContentContainer'
import { PageContext } from '../../../../templates/Detail'
import { commaSeparatedList } from '../../../../utilities/grammar'
import ResourceMap from '../../ResourceMap/ResourceMap'
import { InfoTip } from '../../../ui/InfoTip'

const OverviewTab: React.FC<PageContext> = ({ data }) => {
  const graphData: network.AppGraphData =
    data.resourceMapData !== undefined
      ? data.resourceMapData
      : network.emptyGraphData
  return (
    <TabContentContainer>
      <h5>SUMMARY</h5>
      <p>{data.Long_description}</p>
      <h5>RESOURCE TYPE</h5>
      <p>{data.Resource_type}</p>
      <h5>CATEGORIES</h5>
      <p>{commaSeparatedList(data.Key_topic_area)}</p>
      {graphData && graphData.links.length > 0 && (
        <>
          <h5>RESOURCE MAP</h5>
          <InfoTip />
          <p>
            <ResourceMap selectedNode={data} graphData={graphData} />
          </p>
        </>
      )}
    </TabContentContainer>
  )
}

export default OverviewTab
