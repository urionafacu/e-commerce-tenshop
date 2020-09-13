import React from "react"
import "./About.css"
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';

const estilos = {
  div: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  }
}

export default () => {
  return (
    <div style={estilos.div}>
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="TenShopSoyHenr1"
        options={{height: 600, width: 1200}}
      />
    </div>
  )
};
