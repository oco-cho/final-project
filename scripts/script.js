//Variable for calculating total
let add = 0;

/******************************* Credit Card Expiration Stuff *******************************/
    
    let yearList = ['Year...'];
    
    // Generate List of Years
    function getYears() {
        const yearMin = new Date().getFullYear();
        const yearMax = yearMin + 10;

        for (let i = yearMin; i <= yearMax; i++) {
            yearList.push(i);
    }
        return yearList;
    }
    getYears();

    // Bind Years Arrays to Dropdown Menus
    const expiryYear = document.getElementById('cc-expiration-year');

    for (let i = 0; i < yearList.length; i++) {
        expiryYear.add(new Option(yearList[i]));
    }

/******************************* Pie Size Select Stuff *******************************/

    const size = document.getElementById('pieSize');

    //Function to Remove Previous Pie Size Options
    function removeChildren(parent) {
        while (parent.firstElementChild) {
            parent.removeChild(parent.children[0]);
        }
    }

    //Object to Store Pie Sizes & Prices
    const pieSizeOptions = {
        handTossed: [['Small', 9.99], ['Medium', 12.99], ['Large', 14.99]],
        thinCrust: [['Medium', 11.99], ['Large', 13.99]],
        newYork: [['Large', 16.99], ['Extra Large', 19.99]],
        glutenFree: [['Small', 10.99]]
    }

/******************************* Delievery Info Form - Get, Store, Populate Values *******************************/

    //Object to Store Values
    const contactInfo = {};

    //Function to Store Values
    function getValues() {
        //Get Values
        contactInfo.fName = document.getElementById('deliveryFirstName').value;
        contactInfo.lName = document.getElementById('deliveryLastName').value;
        contactInfo.phone = document.getElementById('deliveryPhone').value;
        contactInfo.email = document.getElementById('deliveryEmail').value;
        contactInfo.addressType1 = document.getElementById('deliveryAddressType').value;
        contactInfo.addressType2 = document.getElementById('deliveryAddressTypeOther').value;
        contactInfo.address = document.getElementById('deliveryAddress').value;
        contactInfo.address2 = document.getElementById('deliveryAddress2').value;
        contactInfo.city = document.getElementById('deliveryCity').value;
        contactInfo.state = document.getElementById('deliveryState').value;
        contactInfo.zip = document.getElementById('deliveryZip').value;
        }

    //Function to Set Values
    function setValues() {
        getValues();
        //Set Values
        document.getElementById('billingFirstName').value = contactInfo.fName; 
        document.getElementById('billingLastName').value = contactInfo.lName;
        document.getElementById('billingPhone').value = contactInfo.phone;
        document.getElementById('billingEmail').value = contactInfo.email;
        document.getElementById('billingAddressType').value = contactInfo.addressType1;
        document.getElementById('billingAddressTypeOther').value = contactInfo.addressType2;
        document.getElementById('billingAddress').value = contactInfo.address;
        document.getElementById('billingAddress2').value = contactInfo.address2;
        document.getElementById('billingCity').value = contactInfo.city;
        document.getElementById('billingState').value = contactInfo.state;
        document.getElementById('billingZip').value = contactInfo.zip;

        if (contactInfo.addressType2 !== '') {
            document.getElementById('addressTypeOther2').classList.remove('hide');
            document.getElementById('address01-2').classList.remove('col-9');
            document.getElementById('address01-2').classList.add('col-12');
        }

        document.getElementById('fieldset04').setAttribute('disabled', 'disabled');
    }

/******************************* Event Listener - CHANGE EVENTS *******************************/

    document.body.addEventListener('change', (e) => {
        //Store Event Target
        let target = e.target;

        //Disable "Choose..." after option is selected in Address Type dropdown
        if (target.id === 'deliveryAddressType') {
            document.getElementById('deliveryAddressType').firstElementChild.setAttribute('disabled', 'disabled');
        }
        //Show / Hide Delivery Info OTHER Input Field
        if (target.id === 'deliveryAddressType' && target.value === 'Other') {
            document.getElementById('addressTypeOther').classList.remove('hide');
            document.getElementById('address01').classList.remove('col-9');
            document.getElementById('address01').classList.add('col-12');
            
        } else if (target.value === 'House' || target.value === 'Apartment' || target.value === 'Business' || target.value === 'Campus' || target.value === 'Hotel' || target.value === 'Dorm') {
            document.getElementById('addressTypeOther').classList.add('hide');
            document.getElementById('address01').classList.add('col-9');
            document.getElementById('address01').classList.remove('col-12');
            document.getElementById('deliveryAddressTypeOther').value = '';
            document.getElementById('error-addTypeOther').classList.add('hide');
        }

        //Disable "Choose..." after option is selected in Address Type dropdown - BILLING
        if (target.id === 'billingAddressType') {
            document.getElementById('billingAddressType').firstElementChild.setAttribute('disabled', 'disabled');
        }
        //Show / Hide Delivery Info OTHER Input Field - BILLING
        if (target.id === 'billingAddressType' && target.value === 'Other') {
            document.getElementById('addressTypeOther2').classList.remove('hide');
            document.getElementById('address01-2').classList.remove('col-9');
            document.getElementById('address01-2').classList.add('col-12');
            
        } else if (target.value === 'House' || target.value === 'Apartment' || target.value === 'Business' || target.value === 'Campus' || target.value === 'Hotel' || target.value === 'Dorm') {
            document.getElementById('addressTypeOther2').classList.add('hide');
            document.getElementById('address01-2').classList.add('col-9');
            document.getElementById('address01-2').classList.remove('col-12');
            document.getElementById('billingAddressTypeOther').value = '';
            document.getElementById('error-addTypeOther02').classList.add('hide');
        }

        //Unhide Build Your Order Step 2
        if (target.id === 'handTossed' || target.id === 'thinCrust' || target.id === 'newYork' || target.id ==='glutenFree') {
            document.getElementById('step2').classList.remove("hideMe");
        }

        //Populate Build Your Order Step 2 Dropdown
        switch (target.id) {
            case 'handTossed':
                removeChildren(size);
                size.add(new Option('Choose...'));
                for (let i = 0; i < pieSizeOptions.handTossed.length; i++) {
                    size.add(new Option(`${pieSizeOptions.handTossed[i][0]} ($${pieSizeOptions.handTossed[i][1]})`))
                };
                break;
            case 'thinCrust':
                removeChildren(size);
                size.add(new Option('Choose...'));
                for (let i = 0; i < pieSizeOptions.thinCrust.length; i++) {
                    size.add(new Option(`${pieSizeOptions.thinCrust[i][0]} ($${pieSizeOptions.thinCrust[i][1]})`))
                    };
                break;
            case 'newYork':
                removeChildren(size);
                size.add(new Option('Choose...'));
                for (let i = 0; i < pieSizeOptions.newYork.length; i++) {
                    size.add(new Option(`${pieSizeOptions.newYork[i][0]} ($${pieSizeOptions.newYork[i][1]})`))
                    };
                break;
                case 'glutenFree':
                    removeChildren(size);
                    size.add(new Option('Choose...'));
                    for (let i = 0; i < pieSizeOptions.glutenFree.length; i++) {
                        size.add(new Option(`${pieSizeOptions.glutenFree[i][0]} ($${pieSizeOptions.glutenFree[i][1]})`))
                        };
                    break;
        }

        //Populate Billing Form with Deleivery Values
        if (document.getElementById('same-address').checked) {
            setValues();
        } 

        //Hand Tossed
        if (e.target.id === 'pieSize' && document.getElementById('handTossed').checked === true && pieSize.value[0] === 'S') {
            document.getElementById('shoppingCart').classList.remove('hide');
            orderPizza.innerHTML = items.handTossed1[0];
            pizza$.innerHTML = `$${items.handTossed1[1]}`;
        }

        if (e.target.id === 'pieSize' && document.getElementById('handTossed').checked === true && pieSize.value[0] === 'M') {
            document.getElementById('shoppingCart').classList.remove('hide');
            orderPizza.innerHTML = items.handTossed2[0];
            pizza$.innerHTML = `$${items.handTossed2[1]}`;

        }

        if (e.target.id === 'pieSize' && document.getElementById('handTossed').checked === true && pieSize.value[0] === 'L') {
            document.getElementById('shoppingCart').classList.remove('hide');
            orderPizza.innerHTML = items.handTossed3[0];
            pizza$.innerHTML = `$${items.handTossed3[1]}`;
        }

        //Thin Crust
        if (e.target.id === 'pieSize' && document.getElementById('thinCrust').checked === true && pieSize.value[0] === 'M') {
            document.getElementById('shoppingCart').classList.remove('hide');
            orderPizza.innerHTML = items.thinCrust1[0];
            pizza$.innerHTML = `$${items.thinCrust1[1]}`;
        }

        if (e.target.id === 'pieSize' && document.getElementById('thinCrust').checked === true && pieSize.value[0] === 'L') {
            document.getElementById('shoppingCart').classList.remove('hide');
            orderPizza.innerHTML = items.thinCrust2[0];
            pizza$.innerHTML = `$${items.thinCrust2[1]}`;
        }

        //New York Style
        if (e.target.id === 'pieSize' && document.getElementById('newYork').checked === true && pieSize.value[0] === 'L') {
            document.getElementById('shoppingCart').classList.remove('hide');
            orderPizza.innerHTML = items.newYork1[0];
            pizza$.innerHTML = `$${items.newYork1[1]}`;
        }

        if (e.target.id === 'pieSize' && document.getElementById('newYork').checked === true && pieSize.value[0] === 'E') {
            document.getElementById('shoppingCart').classList.remove('hide');
            orderPizza.innerHTML = items.newYork2[0];
            pizza$.innerHTML = `$${items.newYork2[1]}`;
        }

        //Gluten Free
        if (e.target.id === 'pieSize' && document.getElementById('glutenFree').checked === true && pieSize.value[0] === 'S') {
            document.getElementById('shoppingCart').classList.remove('hide');
            orderPizza.innerHTML = items.gluten1[0];
            pizza$.innerHTML = `$${items.gluten1[1]}`;
        }
        //Cheese Default Normal
        if (document.getElementById('cheese').value === 'normal' && !document.getElementById('step3').classList.contains('hideMe')) {
            document.getElementById('cheeseRow').classList.remove('hide');
            document.getElementById('orderCheese').innerHTML = items.cheese2[0];
            document.getElementById('cheese$').innerHTML = `$${items.cheese2[1]}`;
        }

        //Cheese Lt
        if (e.target.value === 'light') {
            document.getElementById('orderCheese').innerHTML = items.cheese1[0];
            document.getElementById('cheese$').innerHTML = `$${items.cheese1[1]}`;
        }

        //Cheese Extra
        if (e.target.value === 'extra') {
            document.getElementById('orderCheese').innerHTML = items.cheese3[0];
            document.getElementById('cheese$').innerHTML = `$${items.cheese3[1]}`;
        }

        //Cheese Double
        if (e.target.value === 'double') {
            document.getElementById('orderCheese').innerHTML = items.cheese4[0];
            document.getElementById('cheese$').innerHTML = `$${items.cheese4[1]}`;
        }

        //Sauce Default
        if (document.getElementById('sauce').value === 'regular' && !document.getElementById('step3').classList.contains('hideMe')) {
            document.getElementById('sauceRow').classList.remove('hide');
            document.getElementById('orderSauce').innerHTML = items.sauce1[0];
            document.getElementById('sauce$').innerHTML = `$${items.sauce1[1]}`;
        }

        //Sauce Hearty
        if (e.target.value === 'hearty tomato') {
            document.getElementById('orderSauce').innerHTML = items.sauce2[0];
            document.getElementById('sauce$').innerHTML = `$${items.sauce2[1]}`;
        }

        //Sauce BBQ
        if (e.target.value === 'bbq') {
            document.getElementById('orderSauce').innerHTML = items.sauce3[0];
            document.getElementById('sauce$').innerHTML = `$${items.sauce3[1]}`;
        }

        //Calculate total cost
        if (e.target) {
            cheeseTotal = parseFloat(document.getElementById('cheese$').innerText.slice(1));
            pizzaTotal = parseFloat(document.getElementById('pizza$').innerText.slice(1));
            sauceTotal = parseFloat(document.getElementById('sauce$').innerText.slice(1));
            add = cheeseTotal + pizzaTotal + sauceTotal + ((document.getElementById('orderToppings').children.length -1)*0.99);
            document.getElementById('total').innerText = `$${add.toFixed(2)}`;
        }
    });

    /******************************* Track toppings & add to running total *******************************/
    
    const selectedToppings = new Set();
    const totalCost = document.createElement('li');
    
    totalCost.innerHTML = 
    `
    <li class="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong id="total"></strong>
              </li>
    `;

    document.getElementById('orderToppings').appendChild(totalCost);

    document.getElementById('step5').addEventListener('change', (e) => {
        
        if (e.target.checked) {
            selectedToppings.add(e.target.id);
        } else if (e.target.checked === false) {
            selectedToppings.delete(e.target.id)
        }

        //Delete Toppings List
        function removeToppings() {
            while (document.getElementById('orderToppings').firstElementChild) {
                document.getElementById('orderToppings').removeChild(document.getElementById('orderToppings').firstElementChild);
            }
        }

        removeToppings();

        //Repopulate Toppings List
        for (let item of selectedToppings) {

            document.getElementById('orderToppings').innerHTML +=
            `
            <li class="list-group-item d-flex justify-content-between lh-sm"">
            <div>
              <h6 class="my-0">${item}</h6>
            </div>
            <span class="text-muted">$0.99</span>
          </li>
          `
        }

        document.getElementById('orderToppings').appendChild(totalCost);
    });

/******************************* Event Listener - CHANGE EVENT - for Pie Size Select *******************************/

    size.addEventListener('change', (e) => {
        //Reveal Step 3
        if (e.target) {
            document.getElementById('step3').classList.remove("hideMe");
            document.getElementById('step4').classList.remove("hideMe");
            document.getElementById('step5').classList.remove("hideMe");
            size.firstElementChild.setAttribute('disabled', 'disabled');
            document.getElementById('error-order').classList.add('hide');
        } 
    });

/******************************* Event Listener - CLICK EVENTS *******************************/

    document.body.addEventListener('click', (e) => {

        //Back to Delivery Info
        if (e.target.className === 'backToDelivery') {
            document.getElementById('fieldset01').classList.remove("hide");
            document.getElementById('fieldset02').classList.add("hide");
            document.getElementById('fieldset03').classList.add("hide");
        }

        //Back to Build Your Order
        if (e.target.id === 'backToOrder') {
            document.getElementById('fieldset02').classList.remove("hide");
            document.getElementById('fieldset03').classList.add("hide"); 
        }

        //Finished Building Pizza Button
        if (e.target.id === 'btnFinishedBuilding') {
            if (pieSize.value !== 'Choose...' && pieSize.value !== '') {
                if (confirm('Is your order complete?')) {
                    document.getElementById('fieldset02').classList.add("hide");
                    document.getElementById('fieldset03').classList.remove("hide");
                    }
            } else {
                document.getElementById('error-order').classList.remove('hide');
            } 
        }
    });

/******************************* Form Submission, Billing & Payment Validation, Luhn *******************************/

    //Submit Btn
    let submit = document.getElementById('submit');

    submit.addEventListener('click', (e) => {
        e.preventDefault();
        let cc = document.getElementById('cc-number').value;
        let ccArray = cc.split('').reverse(); //array w/ all digits
        let ccArrayDbl = []; //array that holds digits that need to be doubled
        let ccArraySingle = [];
        let ccDblString = '';
        let total = 0;
       
        //Confirm Length & Prefix
        if (//VISA
            ((cc.length === 13 || cc.length === 16)  && (cc[0] == 4)) ||
            //MASTERCARD
            ((cc.length === 16) && ((cc[0] == 5 && cc[1] == 1) || (cc[0] == 5 && cc[1] == 2) || (cc[0] == 5 && cc[1] == 3) || (cc[0] == 5 && cc[1] == 4) || (cc[0] == 5 && cc[1] == 5))) ||
            //AMEX
            ((cc.length === 15) && ((cc[0] == 3) && (cc[1] == 7)))
            ) {
            //Store numbers that need to be doubled in an array
            for (i = 1; i < ccArray.length; i += 2) {
                ccArrayDbl.push(ccArray[i]);
            }
            //Store Numbers that are NOT doubled in separate array
            for (i = 0; i < ccArray.length; i += 2) {
                ccArraySingle.push(ccArray[i]);
            }
            //Double the numbers that need to be doubled
            for (i = 0; i < ccArrayDbl.length; i++) {
                ccArrayDbl[i] = Number(ccArrayDbl[i])*2;
            }

            ccDblString = ccArrayDbl.join('');

            for(let i = 0; i < ccDblString.length; i++) {
                ccArraySingle.push(ccDblString[i]);
            }

            for (let i = 0; i < ccArraySingle.length; i++) {
            total += Number(ccArraySingle[i])
            }
    
            if (total % 10 === 0) {
                document.getElementById('error-ccInvalid').classList.add('hide');
            } else {
                document.getElementById('error-ccInvalid').classList.remove('hide');
            }

        } else {
            // alert('Not a valid Visa, Mastercard, or Amex number (#1)');
            document.getElementById('error-ccInvalid').classList.remove('hide');
        }

        //Validation for CC Month, Year, CVV
        const cvvPattern =/^\d{3}$/; 

        //Month
        if (document.getElementById('cc-expiration-month').value === '') {
            document.getElementById('error-ccMonth').classList.remove('hide');
        } else {
            document.getElementById('error-ccMonth').classList.add('hide');
        }

        //Year
        if (document.getElementById('cc-expiration-year').value === 'Year...') {
            document.getElementById('error-ccYear').classList.remove('hide');
        } else {
            document.getElementById('error-ccYear').classList.add('hide');
        }

        //Month must be in the future / current month
        let d = new Date();
        if ((document.getElementById('cc-expiration-month').value < d.getMonth()) && (document.getElementById('cc-expiration-month').value !== '') &&  (document.getElementById('cc-expiration-year').value) == d.getFullYear()) {
            document.getElementById('error-ccMonth02').classList.remove('hide');
        } else {
            document.getElementById('error-ccMonth02').classList.add('hide');
        }

        //CVV
        if (!cvvPattern.test(document.getElementById('cc-cvv').value)) {
            document.getElementById('error-cvv').classList.remove('hide');
        } else {
            document.getElementById('error-cvv').classList.add('hide');
        }

        //GET Values from Billing Info Page
        let fNameVal02 = document.getElementById('billingFirstName').value;
        let lNameVal02 = document.getElementById('billingLastName').value;
        let phoneVal02 = document.getElementById('billingPhone').value;
        let emailVal02 = document.getElementById('billingEmail').value;
        let addTypeVal02 = document.getElementById('billingAddressType').value;
        let addTypeOtherVal02 = document.getElementById('billingAddressTypeOther').value;
        let addressVal02 = document.getElementById('billingAddress').value;
        let cityVal02 = document.getElementById('billingCity').value;
        let stateVal02 = document.getElementById('billingState').value;
        let zipVal02 = document.getElementById('billingZip').value;
        
        //First Name
        if (!namePattern.test(fNameVal02)) {
            document.getElementById('error-fname02').classList.remove('hide');
        } else {
            document.getElementById('error-fname02').classList.add('hide');
        }

        //Last Name
        if (!namePattern.test(lNameVal02)) {
            document.getElementById('error-lname02').classList.remove('hide');
        } else {
            document.getElementById('error-lname02').classList.add('hide');
        }

        //Phone
        if (!phonePattern.test(phoneVal02)) {
            document.getElementById('error-phone02').classList.remove('hide');
        } else {
            document.getElementById('error-phone02').classList.add('hide');
        }

        //Email
        if (!emailPattern.test(emailVal02)) {
            document.getElementById('error-email02').classList.remove('hide');
        } else {
            document.getElementById('error-email02').classList.add('hide');
        }

        //Address Type
        if (addTypeVal02 !== '') {
            document.getElementById('error-addType02').classList.add('hide');
        } else {
            document.getElementById('error-addType02').classList.remove('hide');
        }
        //Address Other
        if (addTypeVal02 === 'Other') {
            if (addTypeOtherVal02) {
                document.getElementById('error-addTypeOther02').classList.add('hide');
            } else {
                document.getElementById('error-addTypeOther02').classList.remove('hide');
            }  
        }

        //Address
        if (addressVal02 !== '') {
            document.getElementById('error-address02').classList.add('hide');
        } else {
            document.getElementById('error-address02').classList.remove('hide');
        }

        //City
        if (!namePattern.test(cityVal02)) {
            document.getElementById('error-city02').classList.remove('hide');
            
        } else {
            document.getElementById('error-city02').classList.add('hide');
        }

        //Sate
        if (!statePattern.test(stateVal02)) {
            document.getElementById('error-state02').classList.remove('hide');
        } else {
            document.getElementById('error-state02').classList.add('hide');
        }
        //Zip
        if (!zipPattern.test(zipVal02)) {
            document.getElementById('error-zip02').classList.remove('hide');
        } else {
            document.getElementById('error-zip02').classList.add('hide');
        }
        
        //Tests to see if form is valid
        if (    document.getElementById('error-fname02').classList.contains('hide') && 
                document.getElementById('error-lname02').classList.contains('hide') && 
                document.getElementById('error-phone02').classList.contains('hide') && 
                document.getElementById('error-email02').classList.contains('hide') && 
                document.getElementById('error-addType02').classList.contains('hide') && 
                document.getElementById('error-addTypeOther02').classList.contains('hide') && 
                document.getElementById('error-address02').classList.contains('hide') && 
                document.getElementById('error-city02').classList.contains('hide') && 
                document.getElementById('error-state02').classList.contains('hide') && 
                document.getElementById('error-zip02').classList.contains('hide') &&
                document.getElementById('error-ccInvalid').classList.contains('hide') &&
                document.getElementById('error-ccMonth').classList.contains('hide') &&
                document.getElementById('error-ccYear').classList.contains('hide') &&
                document.getElementById('error-cvv').classList.contains('hide') &&
                document.getElementById('error-ccMonth').classList.contains('hide') &&
                document.getElementById('error-ccMonth02').classList.contains('hide'))
                {
                    alert("Success! You've ordered a pizza!")
                    window.location.replace('pages/redirect.html');
                }
    });

    //Populating Credit Card Type - Displayed Under CC Number Field    
    document.getElementById('cc-number').addEventListener('input', (e) => {
        //Visa
    if (e.target.id === 'cc-number') {
        let cc = e.target.value;
        if (cc[0] == 4) {
            document.getElementById('ccType').innerHTML = 'Visa';
        } else if ((cc[0] == 5 && cc[1] == 1) || (cc[0] == 5 && cc[1] == 2) || (cc[0] == 5 && cc[1] == 3) || (cc[0] == 5 && cc[1] == 4) || (cc[0] == 5 && cc[1] == 5)) {
            document.getElementById('ccType').innerHTML = 'Mastercard';
        } else if ((cc[0] == 3) && (cc[1] == 7)) {
            document.getElementById('ccType').innerHTML = 'American Express';
        } else {
            document.getElementById('ccType').innerHTML = '';
        }
    }
});

/******************************* Form Validation - DELIVERY *******************************/

    let btnStartOrder = document.getElementById('btnStartOrder');   

    const namePattern = /[a-zA-Z]/;
    const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
    const emailPattern = /^\S+@\S+$/;
    const statePattern = /^[A-Z]{2}$/;
    const zipPattern = /\d{5}(-\d{4})?$/;

    btnStartOrder.addEventListener('click', (e) => {
        //GET Values from Delivery Info Page
        let fNameVal = document.getElementById('deliveryFirstName').value;
        let lNameVal = document.getElementById('deliveryLastName').value;
        let phoneVal = document.getElementById('deliveryPhone').value;
        let emailVal = document.getElementById('deliveryEmail').value;
        let addTypeVal = document.getElementById('deliveryAddressType').value;
        let addTypeOtherVal = document.getElementById('deliveryAddressTypeOther').value;
        let addressVal = document.getElementById('deliveryAddress').value;
        let cityVal = document.getElementById('deliveryCity').value;
        let stateVal = document.getElementById('deliveryState').value;
        let zipVal = document.getElementById('deliveryZip').value;
        
        //First Name
        if (!namePattern.test(fNameVal)) {
            document.getElementById('error-fname').classList.remove('hide');
        } else {
            document.getElementById('error-fname').classList.add('hide');
        }

        //Last Name
        if (!namePattern.test(lNameVal)) {
            document.getElementById('error-lname').classList.remove('hide');
        } else {
            document.getElementById('error-lname').classList.add('hide');
        }

        //Phone
        if (!phonePattern.test(phoneVal)) {
            document.getElementById('error-phone').classList.remove('hide');
        } else {
            document.getElementById('error-phone').classList.add('hide');
        }

        //Email
        if (!emailPattern.test(emailVal)) {
            document.getElementById('error-email').classList.remove('hide');
        } else {
            document.getElementById('error-email').classList.add('hide');
        }

        //Address Type
        if (addTypeVal !== '') {
            document.getElementById('error-addType').classList.add('hide');
        } else {
            document.getElementById('error-addType').classList.remove('hide');
        }
        //Address Other
        if (addTypeVal === 'Other') {
            if (addTypeOtherVal) {
                document.getElementById('error-addTypeOther').classList.add('hide');
            } else {
                document.getElementById('error-addTypeOther').classList.remove('hide');
            }  
        }

        //Address
        if (addressVal !== '') {
            document.getElementById('error-address').classList.add('hide');
        } else {
            document.getElementById('error-address').classList.remove('hide');
        }

        //City
        if (!namePattern.test(cityVal)) {
            document.getElementById('error-city').classList.remove('hide');
            
        } else {
            document.getElementById('error-city').classList.add('hide');
        }

        //Sate
        if (!statePattern.test(stateVal)) {
            document.getElementById('error-state').classList.remove('hide');
        } else {
            document.getElementById('error-state').classList.add('hide');
        }
        //Zip
        if (!zipPattern.test(zipVal)) {
            document.getElementById('error-zip').classList.remove('hide');
        } else {
            document.getElementById('error-zip').classList.add('hide');
        }
        
        //Tests to see if form is valid
        if (    document.getElementById('error-fname').classList.contains('hide') && 
                document.getElementById('error-lname').classList.contains('hide') && 
                document.getElementById('error-phone').classList.contains('hide') && 
                document.getElementById('error-email').classList.contains('hide') && 
                document.getElementById('error-addType').classList.contains('hide') && 
                document.getElementById('error-addTypeOther').classList.contains('hide') && 
                document.getElementById('error-address').classList.contains('hide') && 
                document.getElementById('error-city').classList.contains('hide') && 
                document.getElementById('error-state').classList.contains('hide') && 
                document.getElementById('error-zip')) {
                    document.getElementById('fieldset01').classList.add("hide");
                    document.getElementById('fieldset02').classList.remove("hide");
                }
    });

    const items = {
        handTossed1: ['Hand Tossed: Small', 9.99],
        handTossed2: ['Hand Tossed: Medium', 12.99],
        handTossed3: ['Hand Tossed: Large', 14.99],
        thinCrust1: ['Thin Crust: Medium', 11.99],
        thinCrust2: ['Thin Crust: Large', 13.99],
        newYork1: ['New York Style: Large', 16.99],
        newYork2: ['New York Style: Extra Large', 19.99],
        gluten1: ['Gluten Free: Small', 10.99],
        cheese1: ['Cheese: Light', 0.00],
        cheese2: ['Cheese: Normal', 0.00],
        cheese3: ['Cheese: Extra', 2.99],
        cheese4: ['Cheese: Double', 3.99],
        sauce1: ['Regular Tomato', 0.00],
        sauce2: ['Hearty Tomato', 0.99],
        sauce3: ['BBQ Sauce', 1.99],
        topping1: ['Pepperoni', 0.99],
        topping2: ['Sausage', 0.99],
        topping3: ['Ham', 0.99],
        topping4: ['Bacon', 0.99],
        topping5: ['Salami', 0.99],
        topping6: ['Peppers', 0.99],
        topping7: ['Olives', 0.99],
        topping8: ['Jalapenos', 0.99],
        topping9: ['Mushrooms', 0.99],
        topping10: ['Pineapple', 0.99],
        topping11: ['Onion', 0.99],
    };