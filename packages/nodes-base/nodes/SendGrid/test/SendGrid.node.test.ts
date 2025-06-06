/* eslint-disable n8n-nodes-base/node-param-display-name-miscased */
import nock from 'nock';

import { testWorkflows } from '@test/nodes/Helpers';

describe('Test SendGrid Node', () => {
	describe('Mail', () => {
		const sendgridNock = nock('https://api.sendgrid.com/v3')
			.post(
				'/mail/send',
				(body: { reply_to_list?: [{ email: string }] }) =>
					body?.reply_to_list?.[0]?.email === 'test-reply-to@n8n.io',
			)
			.reply(202);

		afterAll(() => sendgridNock.done());

		testWorkflows(['nodes/SendGrid/test/mail.workflow.json']);
	});
});
