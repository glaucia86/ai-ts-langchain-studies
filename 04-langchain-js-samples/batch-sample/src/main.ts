import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import * as dotenv from "dotenv";

dotenv.config();

const model = new ChatOpenAI({
  azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY || "",
  azureOpenAIApiVersion: process.env.AZURE_OPENAI_API_VERSION || "",
  azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME || "",
  azureOpenAIApiEmbeddingsDeploymentName: process.env.AZURE_OPENAI_API_EMBEDDINGS_DEPLOYMENT_NAME || "",
  azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME || "",
});

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are an expert at picking company names."],
  ["human", "What are three good names for a company that makes {product}?"]
]);

const outputParser = new StringOutputParser();

const nameGenerationChain = RunnableSequence.from([
  prompt,
  model,
  outputParser
]);

async function main() {
  const inputs = [
    { product: "large calculators" },
    { product: "alpaca wool sweaters" },
  ];

  const result = await nameGenerationChain.batch(inputs);

  console.log(result);
}

main();
