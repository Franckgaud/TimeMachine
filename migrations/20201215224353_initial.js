exports.up = function(knex) {
    return knex.schema.createTable("item_lists", (table) => {
        table.increments().index();
        table.text("game_title");
        table.text("game_publisher");
        table.text("game_condition");
        table.text("game_description");
        table.text("game_console");
        table.integer("game_price");
        table.text("image_URL");
        table.text("movie_URL");
        table.text("seller_stripe_id");
        table.text("seller_name");
        table.text("seller_family_name");
        table.text("seller_postal_code");
        table.text("seller_address");
        table.text("seller_phone");
        table.text("buyer_stripe_id");
        table.text("buyer_name");
        table.text("buyer_family_name");
        table.text("buyer_postal_code");    
        table.text("buyer_address");    
        table.text("buyer_phone");    
        table.timestamp('registered_date').defaultTo(knex.fn.now());
        
      });
    
};

exports.down = function(knex) {
  
};
