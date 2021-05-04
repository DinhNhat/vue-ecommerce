export default function mongoURI() {
    return process.env.MONGO_USER && process.env.MONGO_PASS
        ? `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster-x.jip7j.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`
        : `mongodb+srv://admin:1234@cluster-x.jip7j.mongodb.net/ecommerceVueDb?retryWrites=true&w=majority`;
}