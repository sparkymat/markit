# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    if user.is_admin
      can :manage, User
    end
  end
end
