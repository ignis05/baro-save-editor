/**
 * Adds some stuff that might be missing from older savefiles
 * @param {Object} parsedGamesession - object with parsed gamesession xml
 */
export default function fixOldSave(parsedGamesession) {
  let campaign = parsedGamesession.elements?.[0]?.elements?.find(
    (el) => el.name === 'MultiPlayerCampaign' || el.name === 'SinglePlayerCampaign',
  )
  // add CampaignSettings
  if (!campaign.elements.find((el) => el.name === 'CampaignSettings')) {
    campaign.elements.unshift({
      type: 'element',
      name: 'CampaignSettings',
      attributes: { radiationenabled: 'false', maxmissioncount: '1' },
    })
  }

  // add crew.elements if missing
  let crew = campaign.elements.find((el) => el.name == 'bots' || el.name == 'crew')
  if (!crew.elements) crew.elements = []
}
