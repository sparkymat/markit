# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    return if user.nil?
    if user.is_admin
      can :manage, User do |u|
        !u.is_admin || (u.id == user.id)
      end
    end
  end
end
