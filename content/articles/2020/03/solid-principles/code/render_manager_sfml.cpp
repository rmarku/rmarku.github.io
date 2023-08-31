/**
    Example renderer class added to follow SRP principle.

    @author Marcucci, Ricardo Martin
    @version 0.1 2020-03-07
*/

#include "render_manager_sfml.h"

void render_manager::draw_ball(Ball &b, sf::RenderWindow *w) {
  sf::CircleShape ball;
  ball.setRadius(b.getRadius());
  ball.setFillColor(sf::Color::Red);
  ball.setOrigin(b.getRadius(), b.getRadius());
  ball.setPosition(b.getX(), b.getY());
  w->draw(ball);
}
