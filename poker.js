var Poker = {
  current_date: '-date-goes-here-',
  usual_suspects: [
    'BobS', 'BradW', 'BrianE', 'ChrisH', 'ChrisR', 'DavidR',  'DavidW',  'EJ',  'GordonC',  'HughB',
    'JayN',  'JohnB',  'JohnH', 'JonM', 'KeithK', 'MarkF',  'OtisW',  'SteveF', 'X1', 'X2'
  ],
  players: {}, // {player_name: exact_payout}
  current_player: '',
  buy_in: 25.00,
  num_players: 7,
  stimulus: 0,
  total_buyin: 0.00,
  total_chips: 0.00,
  total_chips_without_stimulus: 0.00,
  weighting_factor: 1.00,
  results_table: [],
  html_table: "",
  mail_link: '',

  init: function() {
    Poker.set_date();
    $('#date_entry').val(Poker.current_date);

    // Create list of add and update "buttons" for each player.
    Poker.usual_suspects.forEach( function(player) {
      var add_player     = "add_"+player;
      var add_element    = "<a href='#chip_value_page' id='"+add_player+"'>"+player+"</a> ";

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
    Poker.stimulus = parseInt($('#stimulus_slider').val());
  },

  select_player: function(player) {
    Poker.current_player = player;
    $('#chips_for_player').html('Chips for '+Poker.current_player);
    var chip_count_el = $('#chip_count');
    if(Poker.players[Poker.current_player]) {
      chip_count_el.val(''+Poker.players[Poker.current_player]);
    } else {
      chip_count_el.val('');
    }
//    $( '#chip_value_page' ).live( 'pageinit',function(event){
////      alert( 'This page was just enhanced by jQuery Mobile!' );
//      $('#chip_count').focus;
//    });
  },

  save_player: function() {
    var chips = $('#chip_count').val();
    var chip_value = parseFloat(chips);
    if( !isNaN(chip_value) ) {
      var player = Poker.current_player;
      var update_player  = "update_"+player;
      var update_content = player+"&nbsp;$"+chips;
      var update_player_el = $('#'+update_player);
      Poker.players[Poker.current_player] = chip_value;
      if(update_player_el.length > 0) {
        update_player_el.html(update_content);
      } else {
        var update_element = '<li id="contain_'+player+'" class="ui-btn ui-btn-icon-right ui-li-has-arrow '+
            'ui-li ui-corner-top ui-corner-bottom ui-btn-up-e" data-theme="e" >'+
            ' <div class="ui-btn-inner ui-li ui-corner-top" aria-hidden="true">'+
            '   <div class="ui-btn-text">'+
            '     <a href="#chip_value_page" class="ui-link-inherit" id="'+update_player+'">'+
            '         '+update_content+
            '     </a>'+
            '   </div>'+
            '   <span class="ui-icon ui-icon-arrow-r ui-icon-shadow"></span>'+
            '  </div>'+
            '</li>';
        $('#players_list').append(update_element);
        $('#'+update_player).click(function(event) { Poker.select_player(player); });
        $('#add_'+Poker.current_player).hide();
      }
    }
  },

  table_row: function(is_header, row) {
    var col_type = "td"
    if(is_header) { col_type = "th" }
    var t0 = "<"  + col_type + ">";
    var t1 = "</" + col_type + ">";
    var row_data = "<tr>";
    row.forEach( function(item) { row_data += t0 + item + t1; } );
    row_data += "</tr>";
    return row_data;
  },

  update_results: function(rounding_amount) {
    Poker.collect_results();
    Poker.html_table += Poker.table_row(true,["Player", "Chips", "$Exact", "$1", "$5"])

    Poker.results_table.forEach( function(hash) {
      var rowdata = [
        hash['player'],
        hash['chips'],
        "$" + hash['exact'],
        "$" + hash['to_nearest_one_dollar'],
        "$" + hash['to_nearest_five_dollars']
        ]
      Poker.html_table += Poker.table_row(false,rowdata);
    });

    $('#buy_in_result').html(Poker.buy_in)
    $('#stimulus_result').html(Poker.stimulus)
    $('#payout_container').html(Poker.html_table);
    Poker.prep_mail_link(Poker.results_table);
    $('#mail_link').attr("href", Poker.mail_link);
  },

  collect_results: function() {
    Poker.set_total_buyin();
    Poker.set_total_chips();
    Poker.weighting_factor = Poker.total_buyin / Poker.total_chips_without_stimulus;

    Poker.results_table = [];
    var dashes = {
      player:                   '-------',
      chips:                    '-------',
      exact:                    '-------',
      to_nearest_one_dollar:    '-------',
      to_nearest_five_dollars:  '-------',
    };
    var sums = {
      player:                   'TOTALS: ',
      chips:                    0,
      exact:                    0.0,
      to_nearest_one_dollar:    0.0,
      to_nearest_five_dollars:  0.0,
    };
    Poker.usual_suspects.forEach( function(player) {
      var chips = Poker.players[player];
      if(chips) {
        var exact = chips - Poker.stimulus;
        if( exact < 0) {
          exact = 0;
        }
        exact = exact * Poker.weighting_factor;
        var hash = {
          player: player,
          chips: chips,
          exact: (1.0 * Math.round(exact * 100)) / 100.00,
          to_nearest_one_dollar: Math.round(exact),
          to_nearest_five_dollars: (5 * Math.round(exact / 5.0)),
        }
        Poker.results_table.push(hash);
        sums['chips']                   += hash['chips'];
        sums['exact']                   += hash['exact'];
        sums['to_nearest_one_dollar']   += hash['to_nearest_one_dollar'];
        sums['to_nearest_five_dollars'] += hash['to_nearest_five_dollars'];
      }
    });
    // Force to two decimal places
    sums['exact'] = (1.0 * Math.round(sums['exact'] * 100)) / 100.00;
    Poker.results_table.push(dashes);
    Poker.results_table.push(sums);
    return Poker.results_table;
  },

  prep_mail_link: function(table) {
    var crlf = "%0d%0a";
    var emails = 'john.baylor@gmail.com';
    var subj = 'Poker results for '+Poker.current_date;
    var body = "";
    body += "Players:    " + Poker.num_players + crlf;
    body += "Buy-in:     " + Poker.buy_in      + crlf;
    body += "Stimulus:   " + Poker.stimulus    + crlf;
    body += "Cash:       " + Poker.total_buyin + crlf;
    body += "Chips:      " + Poker.total_chips + crlf;
    body += "Chips-Stim: " + Poker.total_chips_without_stimulus + crlf;
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
    body += crlf;
    body += "Created by: http://johnb.github.com/poker.html";
    body += crlf;
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
    var chips_without_stimulus = 0.00;
    Poker.usual_suspects.forEach( function(player) {
      if(Poker.players[player]) {
        var player_chips = Poker.players[player];
        total_chips += player_chips;
        if( player_chips > Poker.stimulus ) {
            chips_without_stimulus += player_chips - Poker.stimulus;
        }
      }
    });
    Poker.total_chips = total_chips;
    Poker.total_chips_without_stimulus = chips_without_stimulus;
  },

  pad_to: function(obj, final_length) {
    return("" + obj + "                    ").substr(0,final_length);
  }
};

$(document).ready(function() { Poker.init(); } );
