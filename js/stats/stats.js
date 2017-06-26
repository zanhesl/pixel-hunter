
import {renderScreen} from '../data/data';
import StatsView from './stats-view';
import Application from '../application';


class StatsPresenter {
  constructor(userName, results) {

    this.userName = userName;
    this.result = results;

    this.view = new StatsView(this.userName, results);
/*
    this.model = new class extends Model {
      get urlRead() {
        return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter/questions`;
      }

      get urlWrite() {
        return ``;
      }
    }();

    this.view = new IntroView();*/
  }


  init() {

    renderScreen(this.view);
/*
    this.model.save(this.userName, this.result)
      .then((data) => this.model.load().then((data)=>{

        this.view = new StatsView(this.userName, data);

        renderScreen(this.view);

        this.view.onBackButtonClick = () => {
          Application.showGreeting();
        };

      }))
      .catch(window.console.error);*/
  }
}

export default (args = {name: `Unknown`, results: ``}) => {

  return new StatsPresenter(args.name, args.results.split(`,`));
};
