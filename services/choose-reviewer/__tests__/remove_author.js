import _ from 'lodash';

import { mockMembers } from './mocks/index';
import removeAuthor from '../remove_author';

describe('services/choose-reviewer/remove_author', function () {

  let members, step;
  beforeEach(function () {
    step = removeAuthor();
    members = _.clone(mockMembers, true);
  });

  it('should remove author from team', function (done) {
    const review = {
      team: members,
      pullRequest: { user: { login: 'Black Widow' } }
    };

    const membersAltered = [
      { login: 'Captain America', rank: 5 },
      { login: 'Hawkeye', rank: 3 },
      { login: 'Hulk', rank: 8 },
      { login: 'Iron Man', rank: 7 },
      { login: 'Spider-Man', rank: 6 },
      { login: 'Thor', rank: 3 }
    ];

    step(review)
      .then(review => {
        assert.deepEqual(review.team, membersAltered);
        done();
      })
      .catch(done);
  });

  it('should do nothing if there are no team', function (done) {
    const review = {
      team: [],
      pullRequest: { user: { login: 'Black Widow' } }
    };

    step(review)
      .then(review => {
        assert.deepEqual(review.team, []);
        done();
      })
      .catch(done);
  });

});

