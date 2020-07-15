import {Database} from "./services/database";
import {Poster} from "./services/poster";
import {Harvester} from "./services/harvester";

const database = new Database;

const poster = new Poster();
const harvester = new Harvester(database);
// harvester.harvest({id: 'memes', subreddits: ['memes', 'dankmemes']});