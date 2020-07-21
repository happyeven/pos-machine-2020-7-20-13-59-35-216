
function getdata(){
    var data = [
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
function createReceipt(barCodes){
    var itemArr = transIntoItemArr(barCodes);
    var itemInfoArr = replenishItemInfo(itemArr);
    var itemInfoDetailsArr = calculateItemSubtotalPrice(itemInfoArr);
    var totalPrice = calculateItemsTotalPrice(itemInfoDetailsArr);
    return generateRecerpt(itemInfoDetailsArr,totalPrice)
}
function transIntoItemArr(barCodes){
    var barCodeAmountMap = getBarCodeAmountMap(barCodes)
    var itemArr = []
    for(let key in barCodeAmountMap){
        var item = {}
        item.barcode = key
        item.Quantity = barCodeAmountMap[key]
        itemArr.push(item)
    }
    return itemArr
}
function replenishItemInfo(itemArr){
    var database = getdata()
    for(let index in itemArr){
        var item = searchInfoFromDatabase(itemArr[index].barcode,database)
        itemArr[index].unitPrice = item.price
        itemArr[index].Name = item.name
    }
    return itemArr
}
function calculateItemSubtotalPrice(itemInfoArr){
    for(var index in itemInfoArr){
        itemInfoArr[index].Subtotal = itemInfoArr[index].unitPrice * itemInfoArr[index].Quantity
    }
    return itemInfoArr
}
function calculateItemsTotalPrice(itemInfoDetailsArr){
    var totalPrice = 0;
    for(var index in itemInfoDetailsArr){
        totalPrice += itemInfoDetailsArr[index].Subtotal
    }
    return totalPrice
}
function generateRecerpt(itemInfoDetailsArr,totlaPrice){
    var receipt = "\n" + "***<store earning no money>Receipt ***" + "\n"
    for(var index in itemInfoDetailsArr){
        var itemInfoDetail = itemInfoDetailsArr[index]
        receipt = receipt + "Name: " + itemInfoDetail.Name + ", Quantity: " + itemInfoDetail.Quantity + ", Unit price: " + itemInfoDetail.unitPrice 
            + " (yuan), Subtotal: " + itemInfoDetail.Subtotal + " (yuan)" + "\n"
    }
    receipt += "----------------------"
    receipt += "\n"
    receipt = receipt + "Total: " + totlaPrice +" (yuan)" + "\n"
    receipt += "**********************"
    console.log(receipt)
    return receipt
}
function getBarCodeAmountMap(barCodes){
    var countedNames = barCodes.reduce(function (allNames, name) { 
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
function searchInfoFromDatabase(barcode,database){
    for(let index in database){
        if(database[index].barcode == barcode){
            return database[index]
        }
    }
}
function printReceipt(){
	var barCodes = [
	  'ITEM000000',
	  'ITEM000000',
	  'ITEM000000',
	  'ITEM000000',
	  'ITEM000000',
	  'ITEM000001',
	  'ITEM000001',
	  'ITEM000004'
	]
createReceipt(barCodes)
}



module.exports = {
    printReceipt
};