
var Poker = {
  current_date: '-date-goes-here-',
  usual_suspects: [
    'ChrisH', 'ChrisR', 'DavidR',  'DavidW',  'EJ',  'GordonC',  'HughB',  'JayN',  'JohnB',  'MarkF',  'OtisW',  'SteveF'
  ],
  players: {}, // {player_name: exact_payout}
  current_player: '',
  buy_in: 25.00,
  num_players: 7,
  total_buyin: 0.00,
  total_chips: 0.00,
  weighting_factor: 1.00,
  results_table: [],
  mail_link: '',

  init: function() {
    Poker.set_date();
    $('#date_entry').val(Poker.current_date);

    // Create list of add and update "buttons" for each player.
    Poker.usual_suspects.forEach( function(player) {
      var add_player     = "add_"+player;
      var add_element    = "<span style=''><a href='#chip_value_page' id='"+add_player+"'>"+player+"</a></span>";

      $('#players_to_choose_from').append(add_element);
      $('#'+add_player).click(   function(event) { Poker.select_player(player); });
    });

    // Attach event handlers
    $('#save_setup_data').click( function() {Poker.save_setup_data();});
    $('#save_player').click( function() {Poker.save_player();});
    $('#show_results').click( function() {Poker.update_results();});
  },

  save_setup_data: function() {
    Poker.buy_in = parseFloat($('#buy_in_slider').val());
    Poker.num_players = parseInt($('#players_slider').val());
  },

  select_player: function(player) {
    Poker.current_player = player;
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
      var player = Poker.current_player;
      var update_player  = "update_"+player;
      var update_element = '<li id="contain_'+player+'" class="ui-btn ui-btn-icon-right ui-li-has-arrow '+
          'ui-li ui-corner-top ui-corner-bottom ui-btn-up-e" data-theme="e" >'+
          ' <div class="ui-btn-inner ui-li ui-corner-top" aria-hidden="true">'+
          '   <div class="ui-btn-text">'+
          '       <a href="#chip_value_page" class="ui-link-inherit" id="'+update_player+'">'+
          '         '+player+"&nbsp;<span id='chips_for_"+player+"'></span>"+
          '     </a>'+
          '   </div>'+
          '   <span class="ui-icon ui-icon-arrow-r ui-icon-shadow"></span>'+
          '  </div>'+
          '</li>';
      $('#players_list').append(update_element);
      $('#'+update_player).click(function(event) { Poker.select_player(player); });

      Poker.players[Poker.current_player] = chip_value;
//      $('#contain_'+Poker.current_player).show();
      $('#chips_for_'+Poker.current_player).html("$"+chips);
      $('#add_'+Poker.current_player).hide();
    }
  },

  table_row: function(is_header, row) {
    var col_type = "td"
    if(is_header) { col_type = "th" }
    var t0 = "<"  + col_type + ">";
    var t1 = "</" + col_type + ">";
    var row_data = "<tr>" +
          t0 + row[0] + t1 +
          t0 + row[1] + t1 +
          t0 + row[2] + t1 +
          t0 + row[3] + t1 +
          "</tr>";
    return row_data;
  },

  update_results: function(rounding_amount) {
    Poker.collect_results();

    $('#payout_container').html(Poker.table_row(true,["Player", "Exact", "$1", "$5"]));
    Poker.results_table.forEach( function(hash) {
      var rowdata = [
        hash['player'],
        "$" + hash['exact'],
        "$" + hash['to_nearest_one_dollar'],
        "$" + hash['to_nearest_five_dollars']
        ]
      $('#payout_container').append(Poker.table_row(false,rowdata));
    });

    Poker.prep_mail_link(Poker.results_table);
    $('#mail_link').attr("href", Poker.mail_link);
  },

  collect_results: function() {
    Poker.set_total_buyin();
    Poker.set_total_chips();
    Poker.weighting_factor = Poker.total_buyin / Poker.total_chips;

    Poker.results_table = [];
    Poker.usual_suspects.forEach( function(player) {
      var chips = Poker.players[player];
      if(chips) {
        var exact = chips * Poker.weighting_factor;
        var hash = {
          player: player,
          chips: chips,
          exact: (1.0 * Math.round(exact * 100)) / 100.00,
          to_nearest_one_dollar: Math.round(exact),
          to_nearest_five_dollars: (5 * Math.round(exact  / 5.0)),
        }
        Poker.results_table.push(hash);
      }
    });
    return Poker.results_table;
  },

  prep_mail_link: function(table) {
    var crlf = "%0d%0a";
    var emails = 'john.baylor@gmail.com';
    var subj = 'Poker results for '+Poker.current_date;
    var body = "";
    body += "Players: " + Poker.num_players + crlf;
    body += "Buy-in:  " + Poker.buy_in      + crlf;
    body += "Cash:    " + Poker.total_buyin + crlf;
    body += "Chips:   " + Poker.total_chips + crlf;
    body += crlf;
    body +=     Poker.pad_to('Player',10) +
                Poker.pad_to('Exact',10) +
                Poker.pad_to('$1',10) +
                Poker.pad_to('$5',10) + crlf;
    body +=     Poker.pad_to('------',10) +
                Poker.pad_to('-----',10) +
                Poker.pad_to('--',10) +
                Poker.pad_to('--',10) + crlf;
    Poker.results_table.forEach( function(hash) {
      body +=   Poker.pad_to(hash['player'],10) +
                '$' + Poker.pad_to(hash['exact'],9) +
                '$' + Poker.pad_to(hash['to_nearest_one_dollar'],9) +
                '$' + Poker.pad_to(hash['to_nearest_five_dollars'],9) + crlf;
    });
    Poker.mail_link = "mailto:" + emails + "?subject=" + subj + "&body=" + body;
  },

  set_date: function() {
    var currentTime = new Date();
    Poker.current_date = '' + currentTime.getFullYear() + "/" +
        (currentTime.getMonth() + 1) + "/" + currentTime.getDate();
  },

  set_total_buyin: function() {
    Poker.total_buyin = 1.0 * Poker.buy_in * Poker.num_players;
  },

  set_total_chips: function() {
    var total_chips = 0.00;
    Poker.usual_suspects.forEach( function(player) {
      if(Poker.players[player]) {
        total_chips += Poker.players[player];
      }
    });
    Poker.total_chips = total_chips;
  },

  pad_to: function(obj, final_length) {
    return("" + obj + "                    ").substr(0,final_length);
  }
};

$(document).ready(function() { Poker.init(); } );
