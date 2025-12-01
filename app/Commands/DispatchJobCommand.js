
import FirstJob from '../Jobs/FirstJob.js';

export default {

    name: 'job',

    description: 'Job test',

    async handle() {

        await FirstJob.dispatchSocket({ text: 'Dispatched to all!', type: "message", name: "comando" });
    }
}   