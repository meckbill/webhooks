export const handler = async (event) => {
  const body = JSON.parse(event.Records[0].body);
  console.log(body);
};
