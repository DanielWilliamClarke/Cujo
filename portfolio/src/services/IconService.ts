/* eslint-disable  @typescript-eslint/no-unused-vars */

import { injectable, interfaces } from "inversify";
import { StyledIcon } from '@styled-icons/styled-icon';

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

import { Bolt } from "@styled-icons/material/Bolt";
import { Book } from "@styled-icons/material/Book";
import { Campaign } from "@styled-icons/material/Campaign";
import { Fingerprint } from "@styled-icons/material/Fingerprint";
import { Hardware } from "@styled-icons/material/Hardware";
import { HistoryEdu } from "@styled-icons/material/HistoryEdu";
import { Home } from "@styled-icons/material/Home";
import { Loyalty } from "@styled-icons/material/Loyalty";
import { ReportProblem } from "@styled-icons/material/ReportProblem";
import { School } from "@styled-icons/material/School";
import { CatchingPokemon } from "@styled-icons/material/CatchingPokemon";
import { PaperPlane } from "@styled-icons/boxicons-regular/PaperPlane";

export interface IIconService {
  get(id: string): StyledIcon | undefined;
  getWithDefault(id: string): StyledIcon;
}

export namespace IIconService {
  export const $: interfaces.ServiceIdentifier<IIconService> = Symbol('IIconService');
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
    home: Home,
    about: Fingerprint,
    experience: Loyalty,
    education: School,
    skills: Bolt,
    projects: Hardware,
    blog: Book,
    cv: PaperPlane,
    post: HistoryEdu,
    contact: Campaign,
    work: Bolt,
    school: LightBulb,

    // DevIcon overrides
    DeviantArt: Deviantart,
    Notion: Notion,
    "Android Studio": Androidstudio,
    Contentful: Contentful,
    XCode: Xcode,
    Rx: Reactivex,
    "Azure DevOps": Azuredevops,
    CMake: Cmake,
    Pokémon: CatchingPokemon,
    "p5.js": P5dotjs,
    Powershell: Powershell,
    Magic: WizardsOfTheCoast,
    Vultr: Vultr,
    MoxField: HatWizard,
    SFML: Sfml,
  };

  get(id: string): StyledIcon | undefined {
    const a = 0;
    return this.iconMap[id];
  }

  getWithDefault(id: string): StyledIcon {
    return this.iconMap[id] ?? ReportProblem;
  }
}
