import BugIcon from './bug.png';
import DarkIcon from './dark.png';
import DragonIcon from './dragon.png';
import ElectricIcon from './electric.png';
import FairyIcon from './fairy.png';
import FightingIcon from './fighting.png';
import FireIcon from './fire.png';
import FlyingIcon from './flying.png';
import GhostIcon from './ghost.png';
import GrassIcon from './grass.png';
import GroundIcon from './ground.png';
import IceIcon from './ice.png';
import NormalIcon from './normal.png';
import PoisonIcon from './poison.png';
import PsychicIcon from './psychic.png';
import RockIcon from './rock.png';
import SteelIcon from './steel.png';
import WaterIcon from './water.png';

export const getPokeTypeIcon = (icon: string)=>{
 switch (icon) {
     case "bug":
         return BugIcon
     case "dark":
         return DarkIcon
     case "dragon":
         return DragonIcon
     case "electric":
         return ElectricIcon
     case "fairy":
         return FairyIcon
     case "fighting":
         return FightingIcon
     case "fire":
         return FireIcon
     case "flying":
         return FlyingIcon
     case "ghost":
         return GhostIcon
     case "grass":
         return GrassIcon
     case "ground":
         return GroundIcon
     case "ice":
         return IceIcon
     case "normal":
         return NormalIcon
     case "poison":
         return PoisonIcon
     case "rock":
         return RockIcon
     case "steel":
         return SteelIcon
     case "water":
         return WaterIcon
     case "psychic":
         return PsychicIcon
 }
}