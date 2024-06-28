import {
  Admin,
  Resource,
} from "react-admin";
import { authProvider } from "./authProvider";
import dataProvider from "./dataProvider";
import { ProjectsList } from '../components/ProjectsList/ProjectsList'
import { EventsList } from '../components/EventsList/EventsList'
import { DevteamList } from '../components/DevteamList/DevteamList'

import { ProjectShow } from '../components/ProjectShow/ProjectShow'
import { EventShow } from '../components/EventShow/EventShow'
import { DevteamShow } from '../components/DevteamShow/DevteamShow'

export const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider}>
    <Resource name="projects" list={ProjectsList} show={ProjectShow} />
    <Resource name="events" list={EventsList} show={EventShow} />
    <Resource name="devteam" list={DevteamList} show={DevteamShow} />
   {/* <Resource name="scientific-work-themes" list={ThemesList} show={ExamplesShow} />
    <Resource name="project-competition" list={CompetitonList} show={CompetitionShow} />*/}

  </Admin>
);
