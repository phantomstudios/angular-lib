import {Inject, Injectable} from '@angular/core';
import {WINDOW} from '@phantom/angular/window';

const POPUP_OPTIONS = 'menubar=no,toolbar=no,resizable=yes,' +
    'scrollbars=yes,height=253,width=600';

export enum SocialNetwork {
  NETWORK_UNSPECIFIED,
  FACEBOOK,
  LINKEDIN,
  TWITTER,
  WHATSAPP,
}

export enum SocialNetworkUrl {
  FACEBOOK = 'https://www.facebook.com/sharer/sharer.php?u=',
  TWITTER = 'https://twitter.com/intent/tweet?url=',
  LINKEDIN = 'https://www.linkedin.com/shareArticle?url=',
  WHATSAPP = 'https://api.whatsapp.com/send?phone=whatsappphonenumber&text=',
}

export declare interface SocialShareOptions {
  prefillCopy?: string;
  twitterHashtagList?: string[];
  twitterVia?: string;
  url?: string;
}

function getTwitterShareLink(
    location: string, socialShareOptions?: SocialShareOptions): string {
  let twitterShareLink = SocialNetworkUrl.TWITTER + location;

  if (socialShareOptions && socialShareOptions.prefillCopy) {
    twitterShareLink += `&text=${encodeURI(socialShareOptions.prefillCopy)}`;
  }

  if (socialShareOptions && socialShareOptions.twitterHashtagList) {
    twitterShareLink +=
        `&hashtags=${socialShareOptions.twitterHashtagList.join(',')}`;
  }

  if (socialShareOptions && socialShareOptions.twitterVia) {
    twitterShareLink += `&via=${encodeURI(socialShareOptions.twitterVia)}`;
  }

  return twitterShareLink;
}

export function getSocialNetworkShareLink(
    location: string, socialNetwork: SocialNetwork,
    socialShareOptions?: SocialShareOptions): string {
  const overrideUrl = socialShareOptions && socialShareOptions.url;
  const shareUrl = overrideUrl || location;

  switch (socialNetwork) {
    case (SocialNetwork.FACEBOOK):
      return SocialNetworkUrl.FACEBOOK + shareUrl;
    case (SocialNetwork.LINKEDIN):
      return SocialNetworkUrl.LINKEDIN + shareUrl;
    case (SocialNetwork.TWITTER):
      return getTwitterShareLink(shareUrl, socialShareOptions);
    case (SocialNetwork.WHATSAPP):
      if (socialShareOptions && socialShareOptions.prefillCopy) {
        return SocialNetworkUrl.WHATSAPP +
            encodeURI(socialShareOptions.prefillCopy + ' ') + shareUrl;
      } else {
        return SocialNetworkUrl.WHATSAPP + shareUrl;
      }
    default:
      return '';
  }
}

/** @dynamic */
@Injectable({providedIn: 'root'})
export class ShareService {
  constructor(@Inject(WINDOW) private readonly window: Window) {}

  shareToSocialNetwork(
      socialNetwork: SocialNetwork, socialShareOptions?: SocialShareOptions) {
    const location = this.window.location.href;
    const socialNetworkShareLink =
        getSocialNetworkShareLink(location, socialNetwork, socialShareOptions);

    this.window.open(socialNetworkShareLink, '', POPUP_OPTIONS);
  }
}
