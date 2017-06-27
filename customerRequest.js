exports.prompt = {
    chooseProfileQuestion: [{
        name: 'chooseProfileAnswer',
        message: 'Please select the profile you want to Choose',
        type: 'list',
        choices: ['Customer', 'Manager']
    }],
    purchaseProductQuestion: [{
        name: 'requestedItem',
        message: 'Please enter the Product Name you wish to Purchase',
        type: 'input'
    }],
    purchaseQuantityQuestion: [{
        name: 'requestedNumber',
        message: 'Please enter the count of the items you wish to Purchase',
        type: 'input'
    }],
    inquirePurchaseQuestion: [{
        name: 'inquirePurchaseAnswer',
        message: 'Do you want to Purchase Items ?',
        type: 'list',
        choices: ['Yes', 'No']
    }]}