
function getdata() {
  let data = [
    {
      barcode: 'ITEM000000',
      name: 'Coca-Cola',
      price: 3
    },
    {
      barcode: 'ITEM000001',
      name: 'Sprite',
      price: 3
    },
    {
      barcode: 'ITEM000002',
      name: 'Apple',
      price: 5
    },
    {
      barcode: 'ITEM000003',
      name: 'Litchi',
      price: 15
    },
    {
      barcode: 'ITEM000004',
      name: 'Battery',
      price: 2
    },
    {
      barcode: 'ITEM000005',
      name: 'Instant Noodles',
      price: 4
    }
  ]
  return data
}
function createReceipt(barCodes) {
  let cartItems = transIntoCartItem(barCodes);
  let cartItemsDetails = replenishItemInfo(cartItems);
  let cartItemsDetailsWithTotalPrice = calculateItemSubtotalPrice(cartItemsDetails);
  let totalPrice = calculateItemsTotalPrice(cartItemsDetailsWithTotalPrice);
  return generateRecerpt(cartItemsDetailsWithTotalPrice, totalPrice)
}
function transIntoCartItem(barCodes) {
  let barCodeAmountMap = getBarCodeAmountMap(barCodes)
  let cartItems = []
  for (let key in barCodeAmountMap) {
    let item = {}
    item.barcode = key
    item.Quantity = barCodeAmountMap[key]
    cartItems.push(item)
  }
  return cartItems
}
function replenishItemInfo(cartItems) {
  let database = getdata()
  for (let index in cartItems) {
    let item = searchInfoFromDatabase(cartItems[index].barcode, database)
    cartItems[index].unitPrice = item.price
    cartItems[index].Name = item.name
  }
  return cartItems
}
function calculateItemSubtotalPrice(cartItemsDetails) {
  for (let index in cartItemsDetails) {
    cartItemsDetails[index].Subtotal = cartItemsDetails[index].unitPrice * cartItemsDetails[index].Quantity
  }
  return cartItemsDetails
}
function calculateItemsTotalPrice(cartItemsDetailsWithTotalPrice) {
  let totalPrice = 0;
  for (let index in cartItemsDetailsWithTotalPrice) {
    totalPrice += cartItemsDetailsWithTotalPrice[index].Subtotal
  }
  return totalPrice
}
function generateRecerpt(cartItemsDetailsWithTotalPrice, totlaPrice) {//todo
  let receipt = "\n" + "***<store earning no money>Receipt ***\n"
  receipt += generateCartItemsReceipt(cartItemsDetailsWithTotalPrice)
  receipt += "----------------------\nTotal: " + totlaPrice + " (yuan)\n**********************"
  return receipt
}
function generateCartItemsReceipt(cartItemsDetailsWithTotalPrice) {
  let receipt = ""
  for (let index in cartItemsDetailsWithTotalPrice) {
    let itemInfoDetail = cartItemsDetailsWithTotalPrice[index]
    receipt = receipt + "Name: " + itemInfoDetail.Name + ", Quantity: " + itemInfoDetail.Quantity + ", Unit price: " + itemInfoDetail.unitPrice
      + " (yuan), Subtotal: " + itemInfoDetail.Subtotal + " (yuan)" + "\n"
  }
  return receipt
}
function getBarCodeAmountMap(barCodes) {
  let countedNames = barCodes.reduce(function (allNames, name) {
    if (name in allNames) {
      allNames[name]++;
    }
    else {
      allNames[name] = 1;
    }
    return allNames;
  }, {});
  return countedNames
}
function searchInfoFromDatabase(barcode, database) {
  for (let index in database) {
    if (database[index].barcode == barcode) {
      return database[index]
    }
  }
}
function printReceipt(barCodes) {
  console.log(createReceipt(barCodes))
}

module.exports = {
  printReceipt
};