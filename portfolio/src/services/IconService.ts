import { injectable, interfaces } from "inversify";
import { IconType } from "react-icons";
import { GiCardDraw } from "react-icons/gi";
import { FaDeviantart, FaWizardsOfTheCoast } from "react-icons/fa";
import { HiLightBulb, HiLightningBolt } from "react-icons/hi";
import {
  SiNotion,
  SiAndroidstudio,
  SiContentful,
  SiXcode,
  SiReactivex,
  SiAzuredevops,
  SiCmake,
  SiP5Dotjs,
  SiPowershell,
  SiVultr,
  SiSfml,
} from "react-icons/si";
import {
  MdBolt,
  MdBook,
  MdCampaign,
  MdFingerprint,
  MdHardware,
  MdHistoryEdu,
  MdHome,
  MdLoyalty,
  MdReportProblem,
  MdSchool,
  MdCatchingPokemon,
  MdCloudDownload,
} from "react-icons/md";

export interface IIconService {
  get(id: string): IconType | undefined;
  getWithDefault(id: string): IconType;
}

export namespace IIconService {
  export const $: interfaces.ServiceIdentifier<IIconService> = Symbol('IIconService');
}

type IconMap = {
  [key: string]: IconType;
};

export type IconWithDefaultState = {
  icon: IconType;
};

@injectable()
export class IconService implements IIconService {
  iconMap: IconMap = {
    home: MdHome,
    about: MdFingerprint,
    experience: MdLoyalty,
    education: MdSchool,
    skills: MdBolt,
    projects: MdHardware,
    blog: MdBook,
    cv: MdCloudDownload,
    post: MdHistoryEdu,
    profiles: MdCampaign,
    work: HiLightningBolt,
    school: HiLightBulb,

    // DevIcon overrides
    DeviantArt: FaDeviantart,
    Notion: SiNotion,
    "Android Studio": SiAndroidstudio,
    Contentful: SiContentful,
    XCode: SiXcode,
    Rx: SiReactivex,
    "Azure DevOps": SiAzuredevops,
    CMake: SiCmake,
    Pokémon: MdCatchingPokemon,
    "p5.js": SiP5Dotjs,
    Powershell: SiPowershell,
    Magic: FaWizardsOfTheCoast,
    Vultr: SiVultr,
    MoxField: GiCardDraw,
    SFML: SiSfml,
  };

  get(id: string): IconType | undefined {
    return this.iconMap[id];
  }

  getWithDefault(id: string): IconType {
    return this.iconMap[id] ?? MdReportProblem;
  }
}
