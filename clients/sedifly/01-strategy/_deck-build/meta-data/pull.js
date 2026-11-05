const fs = require('fs'); const path = require('path');
const ACT = 'act_803550292448381';
const TOK = process.env.ACCESS_TOKEN_TOGGLE;
const OUT = __dirname;
const G = 'https://graph.facebook.com/v23.0/';
async function all(pathq) {
  let url = G + pathq + (pathq.includes('?') ? '&' : '?') + 'access_token=' + TOK;
  const rows = [];
  while (url) {
    const r = await fetch(url); const j = await r.json();
    if (j.error) { return { error: j.error.message }; }
    if (Array.isArray(j.data)) rows.push(...j.data); else return j;
    url = j.paging && j.paging.next;
  }
  return rows;
}
const save = (n, d) => fs.writeFileSync(path.join(OUT, n + '.json'), JSON.stringify(d, null, 1));
const TR = encodeURIComponent(JSON.stringify({ since: '2023-11-05', until: '2026-11-03' }));
const IF = 'spend,impressions,reach,frequency,clicks,inline_link_clicks,ctr,inline_link_click_ctr,cpm,cpc,actions,cost_per_action_type,video_thruplay_watched_actions,video_p25_watched_actions,video_p50_watched_actions,video_p75_watched_actions,video_p100_watched_actions';
(async () => {
  if (!ACT.startsWith('act_803550292448381')) throw 'wrong account';
  save('account', await all(ACT + '?fields=name,currency,timezone_name,amount_spent,created_time,business_country_code,account_status'));
  save('campaigns', await all(ACT + '/campaigns?fields=name,objective,status,effective_status,created_time,start_time,stop_time,daily_budget,lifetime_budget,bid_strategy,buying_type&limit=200'));
  save('adsets', await all(ACT + '/adsets?fields=name,campaign_id,status,effective_status,optimization_goal,billing_event,destination_type,daily_budget,lifetime_budget,start_time,end_time,targeting,promoted_object,created_time&limit=200'));
  save('ads', await all(ACT + '/ads?fields=name,adset_id,campaign_id,status,effective_status,created_time,creative{id,name,title,body,object_type,call_to_action_type,video_id,image_url,thumbnail_url,object_story_spec,asset_feed_spec}&limit=200'));
  save('ins_month', await all(ACT + `/insights?level=account&time_range=${TR}&time_increment=monthly&fields=${IF}&limit=200`));
  save('ins_campaign', await all(ACT + `/insights?level=campaign&time_range=${TR}&fields=campaign_id,campaign_name,objective,date_start,date_stop,${IF}&limit=200`));
  save('ins_adset', await all(ACT + `/insights?level=adset&time_range=${TR}&fields=campaign_name,adset_id,adset_name,date_start,date_stop,${IF}&limit=500`));
  save('ins_ad', await all(ACT + `/insights?level=ad&time_range=${TR}&fields=campaign_name,adset_name,ad_id,ad_name,${IF}&limit=500`));
  for (const b of ['age', 'gender', 'age,gender', 'publisher_platform,platform_position', 'region', 'country', 'device_platform']) {
    save('bd_' + b.replace(/,/g, '_'), await all(ACT + `/insights?level=campaign&time_range=${TR}&breakdowns=${b}&fields=campaign_name,spend,impressions,reach,inline_link_clicks,actions&limit=500`));
  }
  save('pixels', await all(ACT + '/adspixels?fields=name,last_fired_time,creation_time,is_unavailable'));
  save('customaudiences', await all(ACT + '/customaudiences?fields=name,subtype,approximate_count_lower_bound,approximate_count_upper_bound,time_created,rule&limit=200'));
  save('activities', await all(ACT + '/activities?fields=event_time,event_type,translated_event_type,object_name,actor_name,extra_data&limit=500&since=2026-01-01'));
  console.log('done');
})();
