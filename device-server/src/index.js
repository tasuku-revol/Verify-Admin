const fastify = require('fastify');
const app = fastify();
const mongoose = require('mongoose');
const deviceRoutes = require('./routes/deviceRoutes');
const contentRangeHook = require('./hooks/contentRangeHook');
const jwtVerifyHook = require('./hooks/jwtVerifyHook');
const adminRoutes = require('./routes/adminRoutes');
const scepRoutes = require('./routes/scepRoutes');

try {
  const url = process.env.DB_URL
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (e) {
  console.error(e);
}


app.addHook('preHandler', jwtVerifyHook);
app.addHook('preHandler', contentRangeHook);

adminRoutes(app);
deviceRoutes(app);
scepRoutes(app);

app.listen(5000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running on ${address}`);
});