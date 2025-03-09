from langchain.prompts import PromptTemplate
from langchain_openai import OpenAI
from langchain.agents import BaseSingleActionAgent
from langchain.schema import AgentAction, AgentFinish


# Define the prompt template
prompt_template = PromptTemplate(
    input_variables=["input"],
    template="You are an bengali language teacher. Help me translate the following question: {input}"
)

# Initialize the LLM
llm = OpenAI(model="text-davinci-003", api_key="your_api_key")


# ✅ Modern approach: Use RunnableSequence instead of LLMChain
chain = prompt_template | llm


# ✅ Define a custom agent
class MyAgent(BaseSingleActionAgent):
    def __init__(self, chain):
        self.chain = chain

    def _call(self, inputs, **kwargs):
        # This method is called when the agent is executed
        response = self.chain.invoke(inputs)
        return AgentFinish(
            return_values={"output": response},
            log=""
        )

    def input_keys(self):
        return ["input"]

    def _get_default_output_parser(self):
        # You can define a parser here if needed
        pass

    def create_prompt(self):
        # This is mandatory now
        return prompt_template

    def llm_prefix(self):
        # This is mandatory now
        return "Answer:"

    def observation_prefix(self):
        # This is mandatory now
        return "Observation:"


# ✅ Instantiate the agent
agent = MyAgent(chain)


# ✅ Test the agent
if __name__ == "__main__":
    input_text = "What is the Bangla of 'I am working now, can you please call me later?"
    response = agent.invoke({"input": input_text})
    print(response["output"])
