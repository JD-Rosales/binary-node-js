import React from 'react';

import { getFighters } from '../../services/domainRequest/fightersRequest';
import { getFights } from '../../services/domainRequest/fightRequest';
import NewFighter from '../newFighter';
import Fighter from '../fighter';
import { Button } from '@material-ui/core';
import Arena from '../arena';
import FightHistory from '../fightHistory';

import './fight.css';

class Fight extends React.Component {
  state = {
    fighters: [],
    fighter1: null,
    fighter2: null,
    isReady: false,
    fights: [],
  };

  async componentDidMount() {
    const fighters = await getFighters();
    if (fighters && !fighters.error) {
      this.setState({ fighters });
    }

    const fights = await getFights();
    if (fights && !fights.error) {
      this.setState({ fights });
    }
  }

  onFightStart = () => {
    const { fighter1, fighter2 } = this.state;
    if (fighter1 && fighter2) {
      this.setState({ isReady: true });
    }
  };

  onCreate = (fighter) => {
    this.setState({ fighters: [...this.state.fighters, fighter] });
  };

  onFighter1Select = (fighter1) => {
    this.setState({ fighter1 });
  };

  onFighter2Select = (fighter2) => {
    this.setState({ fighter2 });
  };

  getFighter1List = () => {
    const { fighter2, fighters } = this.state;
    if (!fighter2) {
      return fighters;
    }

    return fighters.filter((it) => it.id !== fighter2.id);
  };

  getFighter2List = () => {
    const { fighter1, fighters } = this.state;
    if (!fighter1) {
      return fighters;
    }

    return fighters.filter((it) => it.id !== fighter1.id);
  };

  getFightList = () => {
    const fightList = this.state.fights;

    return fightList;
  };

  render() {
    const { fighter1, fighter2 } = this.state;
    const { isReady } = this.state;

    if (isReady) {
      return <Arena fighter1={fighter1} fighter2={fighter2} />;
    }

    return (
      <div id='wrapper'>
        <NewFighter onCreated={this.onCreate} />
        <div id='figh-wrapper'>
          <Fighter
            selectedFighter={fighter1}
            onFighterSelect={this.onFighter1Select}
            fightersList={this.getFighter1List() || []}
          />
          <div className='btn-wrapper'>
            <Button
              onClick={this.onFightStart}
              variant='contained'
              color='primary'
            >
              Start Fight
            </Button>
          </div>
          <Fighter
            selectedFighter={fighter2}
            onFighterSelect={this.onFighter2Select}
            fightersList={this.getFighter2List() || []}
          />
        </div>

        <FightHistory fightList={this.getFightList() || []} />
      </div>
    );
  }
}

export default Fight;
