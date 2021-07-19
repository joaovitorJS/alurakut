import { SiteClient } from "datocms-client"; 

export default async function receiverRequest(request, response) {
  if (request.method === 'POST') {
    const TOKEN = "dfbe7553248925b563b252112fac7e";
    const client =  new SiteClient(TOKEN);

    const record = await client.items.create({
      itemType: "976514", // Model ID - Communities
      ...request.body
      
      // title: "Comunidade Teste",
      // imageUrl: "https://github.com/joaovitorJS.png",
      // creatorSlug: "joaovitorJS"
    });
  
    // console.log(record);

    response.json({
      record,
    });

    return;
  }

  response.status(404).json({message: "Ainda não temos nada no GET"});
}