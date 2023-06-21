package demo

import (
	"testing"
)

func TestHelloName(t *testing.T) {
	result := Add(2, 3)
	expected := 5
	if result != expected {
		t.Fatalf(`Add(2, 3); wanted %v, got %v`, expected, result)
	}
}
