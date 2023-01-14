/**
    Example of ball implementation for sfml without following SRP principle.

    @author Marcucci, Ricardo Martin
    @version 0.1 2020-03-07
*/

#include "ball_sfml.h"

Ball::Ball(float x, float y, float velX, float velY)
    : x(x), y(y), vel_x(velX), vel_y(velY) {
  radius = 5;
  circle.setRadius(radius);
  circle.setOutlineThickness(0);
  circle.setOutlineColor(sf::Color::Black);
  circle.setFillColor(sf::Color::Red);
  circle.setOrigin(radius, radius);
  circle.setPosition(x, y);
}

void Ball::move(int wWith, int wHeight, int beginX, int beginY, float t) {

  // update positions
  x += vel_x * t;
  y += vel_y * t;

  // check inside box
  if (x - radius < beginX) { // left side
    vel_x *= -1;
    x = beginX + radius;
  } else if (x + radius > beginX + wWith) { // right side
    vel_x *= -1;
    x = (beginX + wWith) - radius;
  } else if (y - radius < beginY) { // left side
    vel_y *= -1;
    y = beginY + radius;
  } else if (y + radius > beginY + wHeight) { // right side
    vel_y *= -1;
    y = (beginY + wHeight) - radius;
  }
  circle.setPosition(x, y);
}

void Ball::draw(sf::RenderWindow *w) { w->draw(circle); }
