
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

    // Create list of add and update "buttons" for each player.
    Poker.usual_suspects.forEach( function(player) {
      var add_player     = "add_"+player;
      var update_player  = "update_"+player;
      var add_element    = "<a href='#chip_value_page' id='"+add_player+"'>"+player+"</a>";
      var update_element = "<li style='display: none'><a href='#chip_value_page' id='"+update_player+"'>"+
          player+"&nbsp;<span id='chips_for_"+player+"'></span></a></li>";
      $('#players_to_choose_from').append(add_element);
      $('#players_list').append(update_element);
      $('#'+add_player).click(   function(event) { Poker.select_player($(event.currentTarget)); });
      $('#'+update_player).click(function(event) { Poker.select_player($(event.currentTarget)); });
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
    if(Poker.players[Poker.current_player]) {
      $('#chip_count').val(''+Poker.players[Poker.current_player]);
    } else {
      $('#chip_count').val('');
    }
  },

  save_player: function() {
    var chips = $('#chip_count').val();
    var chip_value = parseFloat(chips);
    if( !isNaN(chip_value) ) {
      Poker.players[Poker.current_player] = chip_value;
      $('#update_'+Poker.current_player).parent().show();
      $('#chips_for_'+Poker.current_player).html("$"+chips);
      $('#add_'+Poker.current_player).hide();
    }
  },

  update_results: function(rounding_amount) {
    // apply the rounding_amount to each exact payout
    // prep the mailto: link to include all the info
  }
};

$(document).ready(function() { Poker.init(); } );
