# xrpl-Non-Fungible-Token-Product-Edition-Proposal

We’re looking into extending the [XRPL Non-Fungible Token Standard](https://github.com/XRPLF/XRPL-Standards/discussions/46) functionality by combining NFTs into a collection/product. To define a specific collection we expect to use a similar taxon set for all related NFTs.

## Use case and value

This will allow minting NFT by 3 categories for digital and physical products and expanding branches and products.
#### Objective
To guarantee authenticity and protect customers from unauthorized additional issuing of NFTs, our proposal is to extend the standard by adding possibility to set the rules and validate the actual minted NFTs per unique product ids.  
NFT for digital and physical products can contain the type per branch and products with different editions specifying the real amount of items. So, Limited Edition and Single types of products are applicable to valuable collectibles and limited edition collections, which creates additional value for both author and consumer of the artwork.

## Live Demo
[Watch Video](https://www.loom.com/share/d82d871d7ff94f8299655f07b82f6da8)

## Description

Collection ID will be determined by a combination of unique taxon and issuer’s address.
One common taxon will be assigned to all NFTs related to one collection/product.
A number of items/NFTs related to one collection will be controlled by counting unique sequence numbers that also define a unique ID in the collection set.

Fixarta will provide the functionality to allow issuing a collection of user-defined number of NFTs.
Users will have a chance to issue all NFTs in a batch or randomly.
Once the maximum amount is achieved this specific taxon will not be available for issuing by a specific account address.
Hence, we can categorize collection by type:

 * Serial;
 * Limited Edition;
 * Single;

*Example:*

*Issuer mints 5 duck artworks of one limited edition Collection ‘Crazy ducks’.
Issuers can mint these in a row or randomly at any time.
The same taxon will identify these like one collection.
NFTs amount available for minting for this collection = 5.*

Although we expect to provide API methods and user-friendly UI we anticipate a problem that would not allow us to control this throughout the entire ecosystem unless this is implemented on the Ledger level.

To achieve this we propose to consider the following option:

implement an additional flag aimed to set a maximum minting amount or a collection/product edition. Let it be the Maximum Token Amount parameter.

**maxTokenAmount**: Int32
(0…4,294,967,295),

where:
- ‘0’ - serial (unlimited)
- ‘1’ - single (unique)
- ‘N’ - number of limited edition items

*Note:* Currently, all the NFTs issued on XRPL are tagged as ‘Serial’.
Two types can be added:
 * **Single** (after minting issuer is not allowed to mint NFTs with this taxon
 * **Limited Edition**. The app is receiving a minting cutoff once a number of issued NFTs = maxTokenAmount

Extension required:
Minting Cutoff when maxTokenAmount is reached.

*Example:* (Crazy Ducks case):

``` 000B 0C44 95F14B0E44F78A264E41713C64B5F89242540EE2 BC8B858E 00000001 (item 1)
000B 0C44 95F14B0E44F78A264E41713C64B5F89242540EE2 BC8B858E 00000102 (item 2)
000B 0C44 95F14B0E44F78A264E41713C64B5F89242540EE2 BC8B858E 00019994 (item 3)
000B 0C44 95F14B0E44F78A264E41713C64B5F89242540EE2 BC8B858E 00036001 (item 4)
000B 0C44 95F14B0E44F78A264E41713C64B5F89242540EE2 BC8B858E 00500021 (item 5)
 ```

 XRP Address 95F14B0E44F78A264E41713C64B5F89242540EE2 can’t use Collection taxon BC8B858E once the last item NFT minted

 Additionally, Fixarta will ensure sorting and grouping NFTs by collection, date, etc.
 (Listing tokens related to 1 collection in one dropdown/window).
 Automated listing of all Collection items.

 Stay tuned for further related [Fixarta R&D updates.](https://github.com/petushka1/xrpl-Non-Fungible-Token-Product-Edition-Proposal)
