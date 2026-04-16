export class UrlUtil {

  public static getObjectFromQueryString(queryString: string): Record<string, any> {
    const items = queryString.split('&');
    const query = items.reduce<Record<string, any>>((acc, item) => {
      const [key, value] = item.split('=');
      acc[key] = value;
      return acc;
    }, {});
    return query;
  }

  public static getQueryStringFromObject(query: Record<string, any>): string {
    const pairs = Object.keys(query).reduce<string[]>((acc, key) => {
      acc.push([key, query[key]].join('='));
      return acc;
    }, []);
    const queryString = pairs.join('&');
    return queryString;
  }

  public static getObjectFromUrl(url: string): Record<string, any> {
    const queryString = url.split('?')[1];
    return queryString ? UrlUtil.getObjectFromQueryString(queryString) : {};
  }

  public static getRoute(): string[] {
    return location.pathname.split('/'); // ['', video|audio, groupId, videoId]
  }

  public static getRouteVideoId(): string {
    const route = this.getRoute();
    const videoId = route && route.length && route.length > 3 && route[3];
    return videoId;
  }


}
