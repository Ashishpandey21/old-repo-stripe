<form action="/charge" method="post" id="payment-form">
  <div className="form-row">
    <label htmlFor="card-element">
      Credit or debit card
    </label>
    <div id="card-element">
    </div>

    <!-- Used to display Element errors. -->
    <div id="card-errors" role="alert"></div>
  </div>

  <button>Submit Payment</button>
</form>


var stripe = Stripe('pk_test_51KBy5sSECaNOBWfukpxWi5cpAV43ZvYjkaMPE6WP4Qsgif9PIUje4URTU6ptiEAAFBhi1kML06nc8Kn2wcZFcJ90007QrlJgsy');
var elements = stripe.elements();


// Create an instance of the card Element.
var card = elements.create('card', {style: style});

// Add an instance of the card Element into the `card-element` <div>.
card.mount('#card-element');
