import _ from 'lodash';
import * as models from 'app/modules/models';

const PullRequest = models.get('PullRequest');

/**
 * Creates review load processor.
 *
 * @param {Number} max - max rank which will be substract for amount of active reviews.
 *
 * @returns {Function}
 */
export default function reviewLoadCreator(max) {

    /**
     * Substract rank if member has some active reviews.
     *
     * @param {Review} review
     *
     * @returns {Promise}
     */
    return function reviewLoad(review) {
        var promiseList = [];

        if (_.isEmpty(review.team)) {
            return Promise.resolve(review);
        }

        review.team.forEach(function (member) {
            promiseList.push(PullRequest.findOpenReviewsByUser(member.login));
        });

        return Promise
            .all(promiseList)
            .then(function (openedReviews) {
                _(openedReviews)
                    .uniq(function (item) { return item.id; })
                    .first()
                    .forEach(function (activeReview) {
                        activeReview.review.reviewers.forEach(function (reviewer) {
                            reviewer = _.find(review.team, { login: reviewer.login });

                            reviewer.rank -= max;
                        });
                    });

                return review;
            });
    };
}