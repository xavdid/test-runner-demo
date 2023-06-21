defmodule HelloWorldTest do
  use ExUnit.Case

  test "does basic math" do
    assert HelloWorld.add(2,3) == 5
  end
end
