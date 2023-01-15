export default async function (req, res) {
  res.status(200).json({ result: "Hi, I'll be the graphql endpoint!" });
}
