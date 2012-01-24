
var Poker = {
  current_date: '-date-goes-here-',
  usual_suspects: [
    'ChrisH', 'ChrisR', 'DavidR',  'DavidW',  'EJ',  'GordonC',  'HughB',  'JayN',  'JohnB',  'MarkF',  'OtisW',  'SteveF'
  ],
  players: {}, // {player_name: exact_payout}
  payouts: [], // [player_name, rounded_payout]
  current_player: '',
  buy_in: 25.00,
  num_players: 7,

  init: function() {
    // Set the date
    var currentTime = new Date();
    var month = currentTime.getMonth() + 1;
    var day = currentTime.getDate();
    var year = currentTime.getFullYear();
    Poker.current_date = '' + year + "/" + month + "/" + day;
    $('#date_entry').val(Poker.current_date);

    // Attach save_setup_data to the #save_setup_data element
    $('#save_setup_data').click( function() {Poker.save_setup_data();});

    // Create list of "buttons" in the #players_to_choose_from span
    //   - attach select_player to each of the added players
    // TODO: make it dynamic like the comment above says it should be.
    $(".player").click(function(event) {
      console.log(event)
      console.log(event.currentTarget)
      Poker.select_player($(event.currentTarget));
      window.location = "#chip_value_page"
    });

    // Attach save_player to the #save_player element
    $('#save_player').click( function() {Poker.save_player();});

  },

  save_setup_data: function() {
    Poker.buy_in = parseFloat($('#buy_in_slider').val());
    Poker.num_players = parseInt($('#players_slider').val());
  },

  select_player: function(element) {
    Poker.current_player = element.html();
    $('#chips_for_player').html('Chips for '+Poker.current_player);
    $('#chip_count').val(Poker.players[Poker.current_player]);
    element.hide();
    // add to players list
    var html = "<li><a href='#chip_value_page' id='"+Poker.current_player+"'>"+Poker.current_player+"</li>";
    $('#players_list').append(html);
  },

  save_player: function() {
    var chips = $('#chip_count').val();
    var chip_value = parseFloat(chips);
    Poker.current_player[Poker.current_player] = chip_value;
    // update players list with $$$
    $('#'+Poker.current_player).html(Poker.current_player+" $"+chips);
  },

  update_results: function(rounding_amount) {
    // apply the rounding_amount to each exact payout
    // prep the mailto: link to include all the info
  }
};

$(document).ready(function() { Poker.init(); } );
