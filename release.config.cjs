const PROJECT_NAME = "Test Service";

const { SLACK_WEBHOOK } = process.env;
console.log("Hook length:", `${SLACK_WEBHOOK}`.length);

module.exports = {
    branches: [
        "main",
        {
            name: "staging",
            channel: "staging",
            prerelease: "r",
        }
    ],
    plugins: [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        "@semantic-release/changelog",
        "@semantic-release/npm",
        ["@semantic-release/git", {
            assets: [
                "CHANGELOG.md",
                "package.json",
                "package-lock.json"
            ],
            message: "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
        }],
        [
            "@semantic-release/exec",
            {
                publishCmd: "npm run deploy",
            }
        ],
        [
            "semantic-release-slack-bot",
            {
                markdownReleaseNotes: true,
                notifyOnSuccess: false,
                notifyOnFail: false,
                packageName: PROJECT_NAME,
                slackWebhook: SLACK_WEBHOOK,
                branchesConfig: [{
                    pattern: "staging",
                    notifyOnSuccess: true,
                    notifyOnFail: true,
                }, ],
            },
        ],
        [
            "semantic-release-slack-bot",
            {
                markdownReleaseNotes: true,
                notifyOnSuccess: false,
                notifyOnFail: false,
                packageName: PROJECT_NAME,
                slackWebhook: SLACK_WEBHOOK,
                branchesConfig: [{
                    pattern: "main",
                    notifyOnSuccess: true,
                    notifyOnFail: true,
                }, ],
            },
        ]
    ]
};
