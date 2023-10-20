/* eslint-disable  @typescript-eslint/no-unused-vars */
import "reflect-metadata";

import { injectable, interfaces } from "inversify";
import { StyledIcon } from "@styled-icons/styled-icon";

import { HatWizard } from "@styled-icons/fa-solid/HatWizard";
import { WizardsOfTheCoast } from "@styled-icons/fa-brands/WizardsOfTheCoast";
import { Deviantart } from "@styled-icons/boxicons-logos/Deviantart";
import { LightBulb } from "@styled-icons/heroicons-outline/LightBulb";

import { Notion } from "@styled-icons/simple-icons/Notion";
import { Androidstudio } from "@styled-icons/simple-icons/Androidstudio";
import { Contentful } from "@styled-icons/simple-icons/Contentful";
import { Xcode } from "@styled-icons/simple-icons/Xcode";
import { Reactivex } from "@styled-icons/simple-icons/Reactivex";
import { Azuredevops } from "@styled-icons/simple-icons/Azuredevops";
import { Cmake } from "@styled-icons/simple-icons/Cmake";
import { P5dotjs } from "@styled-icons/simple-icons/P5dotjs";
import { Powershell } from "@styled-icons/simple-icons/Powershell";
import { Vultr } from "@styled-icons/simple-icons/Vultr";
import { Sfml } from "@styled-icons/simple-icons/Sfml";

import { Bolt } from "@styled-icons/material-rounded/Bolt";
import { Pen } from "@styled-icons/boxicons-regular/Pen";
import { MessageAltDots } from "@styled-icons/boxicons-regular/MessageAltDots";
import { Fingerprint } from "@styled-icons/boxicons-regular/Fingerprint";
import { BookHeart } from "@styled-icons/boxicons-regular/BookHeart";
import { HomeHeart } from "@styled-icons/boxicons-regular/HomeHeart";
import { Error } from "@styled-icons/boxicons-regular/Error";
import { School } from "@styled-icons/material-rounded/School";
import { CatchingPokemon } from "@styled-icons/material/CatchingPokemon";
import { PaperPlane } from "@styled-icons/boxicons-regular/PaperPlane";
import { Baby } from "@styled-icons/fa-solid/Baby";
import { BookmarkHeart } from "@styled-icons/boxicons-regular/BookmarkHeart";
import { Code } from "@styled-icons/material/Code";
import { StreetView } from "@styled-icons/boxicons-regular/StreetView";
import { Meteor } from "@styled-icons/boxicons-regular/Meteor";
import { Data } from "@styled-icons/boxicons-regular/Data";

export interface IIconService {
  get: (id: string) => StyledIcon | undefined;
  getWithDefault: (id: string) => StyledIcon;
}

export namespace IIconService {
  export const $: interfaces.ServiceIdentifier<IIconService> =
    Symbol("IIconService");
}

type IconMap = {
  [key: string]: StyledIcon;
};

export type IconWithDefaultState = {
  icon: StyledIcon;
};

@injectable()
export class IconService implements IIconService {
  iconMap: IconMap = {
    home: HomeHeart,
    about: Fingerprint,
    experience: StreetView,
    education: School,
    skills: Bolt,
    projects: Meteor,
    books: BookmarkHeart,
    blog: Pen,
    cv: PaperPlane,
    post: BookHeart,
    contact: MessageAltDots,
    work: Bolt,
    school: LightBulb,
    baby: Baby,
    code: Code,

    // DevIcon overrides
    DeviantArt: Deviantart,
    Notion,
    "Android Studio": Androidstudio,
    Contentful,
    XCode: Xcode,
    Rx: Reactivex,
    "Azure DevOps": Azuredevops,
    CMake: Cmake,
    Pokémon: CatchingPokemon,
    "p5.js": P5dotjs,
    Powershell,
    Magic: WizardsOfTheCoast,
    Vultr,
    MoxField: HatWizard,
    SFML: Sfml,
    BigQuery: Data,
  };

  get(id: string): StyledIcon | undefined {
    const a = 0;
    return this.iconMap[id];
  }

  getWithDefault(id: string): StyledIcon {
    return this.iconMap[id] ?? Error;
  }
}
