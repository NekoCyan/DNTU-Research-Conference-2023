const { TravelPromptForTemplate } = require('./Constants');

/**
 * @typedef {Object} TravelPromptTypeDef
 * @property {string} destination Destination where to go.
 * @property {string} budget Budget for the travel.
 * @property {number} duration Duration of the travel.
 * @property {Array<string>} interests Interests (Foods, Music, Historical...).
 * @property {string} accommodation Accommodation (Hotel, Hostel, Camping...).
 * @property {string} travelWith Travel with (Family, Friends, Alone...).
 * @property {string} moveByVehicle Move by vehicle (Car, Bus, Train, Plane...).
 * @property {Array<string>} activities Activities (Sightseeing, Shopping, Hiking...).
 * @property {Array<string>} cuisines Cuisines (Turkish, Italian, Chinese...).
 * @property {string} language Language (English, Vietnamese, ...).
 * 
 * @param {TravelPromptTypeDef} values
 * @returns {Promise<string | Error>}
 */
module.exports = async (values) => {
    const { PromptTemplate, } = await import('langchain/prompts');
    const { OpenAI, } = await import('langchain/llms/openai');
    const { LLMChain, } = await import('langchain/chains');
    const { Serper, } = await import('langchain/tools');
    const { Calculator, } = await import('langchain/tools/calculator');

    const {
        destination, budget, duration, interests, accommodation,
        travelWith, moveByVehicle, activities, cuisines, language,
    } = values;

    const {
        OPENAI_API_KEY, SERPER_API_KEY,
    } = process.env;

    const prompt = PromptTemplate.fromTemplate(TravelPromptForTemplate);
    const openAI = new OpenAI({ temperature: 0.2, openAIApiKey: OPENAI_API_KEY, maxTokens: 3800 });
    const tools = [
        new Serper({ serperApiKey: SERPER_API_KEY }),
        // new Calculator()
    ];

    const llm = new LLMChain({ llm: openAI, prompt, tools });
    /**
     * @type {{text: string}}
     */
    const res = await llm.call({
        destination, 
        budget, 
        duration, 
        interests: interests.map(x => x?.toString()).join(', '), 
        accommodation,
        travelWith, 
        moveByVehicle, 
        activities: activities.map(x => x?.toString()).join(', '),
        cuisines: cuisines.map(x => x?.toString()).join(', '),
        language,
    }).catch(e => { return new Error(e); });

    return res?.text.trim() || res;
}