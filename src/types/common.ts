export type CommonState = {
    rssFolders:RssFolder[],
    rssFeeds:RssFeed[],
    currentFolderId:string | undefined,
    currentRssFeedId:string | undefined,
    loading:boolean,
    currentRssData:string,
    errors:any
}

export type RssFeed = {
    id:string,
    title:string,
    url:string,
    allItemsCount:number,
    oldItemsCount:number,
    iconPath:string,
    rssFolderId:string,
    filters:string[]
}

export type RssFolder = {
    id:string,
    name:string,
    iconPath:string,
}

