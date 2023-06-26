/**
    Example of ball implementation following SRP principle.

    @author Marcucci, Ricardo Martin
    @version 0.1 2020-03-07
 */

#include "ball.h"

Ball::Ball(float x, float y, float velX, float velY)
    : x(x), y(y), vel_x(velX), vel_y(velY) {
  radius = 5;
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
}

float Ball::getX() const { return x; }

float Ball::getY() const { return y; }

float Ball::getRadius() { return radius; }
