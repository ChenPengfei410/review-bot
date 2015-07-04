import * as config from 'app/core/config';

export default {
    approveCount: 2,
    processors: [
        require('app/plugins/review_choose_reviewers/github_org_team')(config.load('github_org_team')),
        require('app/plugins/review_choose_reviewers/remove_author')(),
        require('app/plugins/review_choose_reviewers/remove_already_reviewers')(),
        require('app/plugins/review_choose_reviewers/random')(15),
        require('app/plugins/review_choose_reviewers/sort')(),
        require('app/plugins/review_choose_reviewers/total_number')(2)
    ],
    listeners: {
        'github:pull_request:opened': [require('app/plugins/review_autoassign')()],
        'github:issue_comment': [
            require('app/plugins/review_commands/dispatcher')({
                commands: {
                    'start': [require('app/plugins/review_commands/start')()],
                    'ok': [require('app/plugins/review_commands/ok')()]
                },
                aliases: {}
            })
        ]
    }
};
