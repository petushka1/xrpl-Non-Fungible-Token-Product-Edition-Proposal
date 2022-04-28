var express = require('express');
var router = express.Router();
const xrpl = require("xrpl");

/* GET home page. */
router.get('/', async function(req, res, next) {
  console.log(req.query);
  const addr = req.query.addr;
  var nftProdList = {};
  if (addr) {
    // fetch NFTs, associate to products
    const xrplClient = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233");
    await xrplClient.connect();
    const ret = await xrplClient.request({
      "command": "account_nfts",
      "account": addr
      });
    var nfts = ret.result.account_nfts;
    // sort by Serial first, since tokens are not delivered sorted
    nfts.sort((a,b) => a.nft_serial - b.nft_serial);
    // decode URIs. We don't use it at the moment though
    nfts = nfts.map(d => (
      Object.assign({}, d, {decodedURI: xrpl.convertHexToString(d.URI)})
      ));
    // group tokens by Taxon, since we treat it as a product ID
    nfts.forEach(e => {
      if (nftProdList[e.NFTokenTaxon] === undefined) nftProdList[e.NFTokenTaxon] = [];
      nftProdList[e.NFTokenTaxon].push(e);
    });

  }
  console.log('Grouped NFTs are:', nftProdList);

  res.render('index', {
    addr: addr ? addr : '',
    nftProdList: nftProdList
  });
});

module.exports = router;
