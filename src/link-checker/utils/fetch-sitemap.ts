import axios from 'axios';
import getStatus from './get-status.js';

export default function (config: { url: string; test: boolean }) {
    return new Promise(function (resolve, reject) {
        console.log('Fetching the links from the page provided...');
        axios
            .get(config.url)
            .then((response) => createLinkArray(response.data))
            .catch((error) => {
                reject('error');
                console.log(error);
            });

        // convert that sitemap into an array of URLs
        const createLinkArray = (sitemapString: any) => {
            console.log('Cleaning link data...');
            const urlRegex =
                /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;

            const urlsToFilter = [
                '.png',
                '.jpg',
                '.svg',
                'www.sitemaps.org',
                'www.google.com',
            ];

            const filterRegex = new RegExp(urlsToFilter.join('|'));
            const filterTest = (string: string) => filterRegex.test(string);

            const urlArray = sitemapString.match(urlRegex) || [];
            const filteredUrlArray = urlArray.filter(
                (item: string) => !filterTest(item)
            );
            if (config.test) resolve(filteredUrlArray);
            if (!config.test) resolve(getStatus(config, filteredUrlArray));
        };
    });
}
