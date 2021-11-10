import {TestBed} from '@angular/core/testing';

import {setupComponentTestingModule} from '../testing/test-lib';
import {WINDOW, WindowModule} from '../window';

import {getSocialNetworkShareLink, ShareService, SocialNetwork, SocialNetworkUrl} from './share';

const MOCK_HASHTAG_LIST = ['cool', 'story', 'bro'];
const MOCK_SHARE_COPY = 'Check out my sick link';
const MOCK_VIA_PARAMETER = 'James Riall';
const MOCK_WINDOW_LOCATION = 'https://example.com/';
const MOCK_OVERRIDE_URL = 'https://external-example.com/share/';

describe('The share service', () => {
  let shareService: ShareService;

  beforeEach(() => {
    setupComponentTestingModule({
      imports: [WindowModule],
      providers: [
        ShareService,
        {
          provide: WINDOW,
          useValue: {
            location: {
              href: MOCK_WINDOW_LOCATION,
            },
          },
        },
      ],
    });
    shareService = TestBed.injectTestBed.inject(ShareService);
  });

  it('shares a link to Facebook correctly', () => {
    const expectedShareUrl = SocialNetworkUrl.FACEBOOK + MOCK_WINDOW_LOCATION;

    expect(
        getSocialNetworkShareLink(MOCK_WINDOW_LOCATION, SocialNetwork.FACEBOOK))
        .toBe(expectedShareUrl);
  });

  it('shares a link to LinkedIn correctly', () => {
    const expectedShareUrl = SocialNetworkUrl.LINKEDIN + MOCK_WINDOW_LOCATION;

    expect(
        getSocialNetworkShareLink(MOCK_WINDOW_LOCATION, SocialNetwork.LINKEDIN))
        .toBe(expectedShareUrl);
  });

  it('shares a link with no prefilled copy to Twitter correctly', () => {
    const expectedShareUrl = SocialNetworkUrl.TWITTER + MOCK_WINDOW_LOCATION;

    expect(
        getSocialNetworkShareLink(MOCK_WINDOW_LOCATION, SocialNetwork.TWITTER))
        .toBe(expectedShareUrl);
  });

  it('shares a link with prefilled copy to Twitter correctly', () => {
    const expectedShareUrl = SocialNetworkUrl.TWITTER + MOCK_WINDOW_LOCATION +
        '&text=Check%20out%20my%20sick%20link';

    expect(getSocialNetworkShareLink(
               MOCK_WINDOW_LOCATION, SocialNetwork.TWITTER,
               {prefillCopy: MOCK_SHARE_COPY}))
        .toBe(expectedShareUrl);
  });

  it(`shares a link with the 'hashtags' parameter to Twitter correctly`, () => {
    const expectedShareUrl = SocialNetworkUrl.TWITTER + MOCK_WINDOW_LOCATION +
        '&hashtags=cool,story,bro';

    expect(getSocialNetworkShareLink(
               MOCK_WINDOW_LOCATION, SocialNetwork.TWITTER,
               {twitterHashtagList: MOCK_HASHTAG_LIST}))
        .toBe(expectedShareUrl);
  });

  it(`shares a link with the 'via' parameter to Twitter correctly`, () => {
    const expectedShareUrl =
        SocialNetworkUrl.TWITTER + MOCK_WINDOW_LOCATION + '&via=James%20Riall';

    expect(getSocialNetworkShareLink(
               MOCK_WINDOW_LOCATION, SocialNetwork.TWITTER,
               {twitterVia: MOCK_VIA_PARAMETER}))
        .toBe(expectedShareUrl);
  });

  it(`shares a link with multiple parameters to Twitter correctly`, () => {
    const expectedShareUrl = SocialNetworkUrl.TWITTER + MOCK_WINDOW_LOCATION +
        '&text=Check%20out%20my%20sick%20link' +
        '&hashtags=cool,story,bro' +
        '&via=James%20Riall';
    const mockShareOptions = {
      prefillCopy: MOCK_SHARE_COPY,
      twitterHashtagList: MOCK_HASHTAG_LIST,
      twitterVia: MOCK_VIA_PARAMETER,
    };

    expect(getSocialNetworkShareLink(
               MOCK_WINDOW_LOCATION, SocialNetwork.TWITTER, mockShareOptions))
        .toBe(expectedShareUrl);
  });

  it('shares a link with no prefilled copy to WhatsApp correctly', () => {
    const expectedShareUrl = SocialNetworkUrl.WHATSAPP + MOCK_WINDOW_LOCATION;

    expect(
        getSocialNetworkShareLink(MOCK_WINDOW_LOCATION, SocialNetwork.WHATSAPP))
        .toBe(expectedShareUrl);
  });

  it('shares a link with prefilled copy to WhatsApp correctly', () => {
    const expectedShareUrl =
        `${SocialNetworkUrl.WHATSAPP}Check%20out%20my%20sick%20link%20${
            MOCK_WINDOW_LOCATION}`;

    expect(getSocialNetworkShareLink(
               MOCK_WINDOW_LOCATION, SocialNetwork.WHATSAPP,
               {prefillCopy: MOCK_SHARE_COPY}))
        .toBe(expectedShareUrl);
  });

  it(`shares a link with a custom url`, () => {
    const mockShareOptions = {
      url: MOCK_OVERRIDE_URL,
    };

    const expectedShareUrl = SocialNetworkUrl.FACEBOOK + mockShareOptions.url;

    expect(getSocialNetworkShareLink(
               MOCK_WINDOW_LOCATION, SocialNetwork.FACEBOOK, mockShareOptions))
        .toBe(expectedShareUrl);
  });
});
