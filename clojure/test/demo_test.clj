(ns demo-test
  (:require [clojure.test :refer [deftest is]]
            demo))

(deftest basic-math
  (is (= (demo/add 2 3) 5)))
