// This is the transformed version of styles.scss
// because sass-extract-loader has deprecated
// dependencies and we now do this better in
// talus-gatsby-starter projects anyway.

// this will make the project easier to build
// on newer node versions and platforms like M1
const theme = {
  colorDarkest: 'rgba(6, 57, 104, 1)',
  colorDarker: 'rgba(49, 109, 164, 1)',
  colorMed: 'rgba(123, 168, 209, 1)',
  colorLighter: 'rgba(189, 217, 242, 1)',
  colorLightest: 'rgba(227, 237, 246, 1)',
  colorWayLightest: 'rgba(248, 251, 255, 1)',
  colorBlack: 'rgba(29, 29, 29, 1)',
  colorWhite: 'rgba(255, 255, 255, 1)',
  colorVeryDarkGray: 'rgba(97, 101, 107, 1)',
  colorDarkGray: '#757c85',
  colorMedGray: 'rgba(211, 211, 211, 1)',
  colorLightGray: 'rgba(234, 235, 237, 1)',
  colorVeryLightGray: 'rgba(247, 247, 249, 1)',
  colorRed: 'rgba(193, 47, 47, 1)',
  colorOrange: 'rgba(221, 115, 0, 1)',
  colorGolden: 'rgba(237, 180, 88, 1)',
  colorYellow: 'rgba(246, 211, 86, 1)',
  colorVeryLightYellow: 'rgba(253, 246, 221, 1)',
  colorGreen: 'rgba(78, 182, 121, 1)',
  colorTeal: 'rgba(81, 158, 138, 1)',
  colorDarkOther: 'rgba(9, 43, 132, 1)',
  colorMedOther: 'rgba(135, 154, 216, 1)',
  colorLightOther: 'rgba(191, 200, 226, 1)',
  colorSuperLightOther: 'rgba(231, 236, 251, 1)',
  colorBrightBlue: 'rgba(32, 140, 238, 1)',
  colorPink: 'rgba(183, 81, 185, 0.99)',
  colorPurple: 'rgba(118, 83, 218, 0.99)',
  colorCoreGuidance: 'rgba(182, 78, 78, 1)',
  colorProtocols: 'rgba(178, 83, 186, 1)',
  colorTrainings: 'rgba(77, 45, 165, 1)',
  colorPolicies: 'rgba(81, 158, 138, 1)',
  colorSuperDarkest: 'rgba(5, 33, 58, 1)',

  textStyleH1: `
  font-size: 34px;
  font-family: 'Open Sans';
  font-weight: bolder;
  font-style: normal;
`,
  textStyleH2: `
  font-size: 28px;
  font-family: 'Open Sans';
  font-weight: bolder;
  font-style: normal;
`,
  textStyleH3: `
  font-size: 24px;
  font-family: 'Open Sans';
`,
  textStyleH3SpreadOut: `
  font-size: 24px;
  font-family: 'Open Sans';
  font-weight: normal;
  font-style: normal;
  line-height: 38px;
`,
  textStyleH4Semibold: `
  font-size: 20px;
  font-family: 'Open Sans';
`,
  textStyleH4Regular: `
  font-size: 20px;
  font-family: 'Open Sans';
  font-weight: normal;
  font-style: normal;
`,
  textStyleH5: `
  font-size: 18px;
  font-family: 'Open Sans';
  line-height: 23px;
`,
  textStyleH6: `
  font-size: 16px;
  font-family: 'Open Sans';
`,
  textStyleBreadcrumbs: `
  font-size: 16px;
  font-family: 'Open Sans';
  font-weight: normal;
  font-style: normal;
`,
  textStyleParagraphMoreSpace: `
  font-size: 18px;
  font-family: 'Open Sans';
  font-weight: normal;
  font-style: normal;
  line-height: 30px;
`,
  textStyleFilterLabels: `
  font-size: 18px;
  font-family: 'Open Sans';
  font-weight: bolder;
  font-style: normal;
`,
  textStyleParagraph: `
  font-size: 16px;
  font-family: 'Open Sans';
  font-weight: normal;
  font-style: normal;
`,
}

export default theme
