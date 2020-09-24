import React, { FC, useEffect, useState } from 'react'
import { Collapse, Empty, List } from 'antd'
import { connect } from 'react-redux'
import { Clone } from '../../models/Clone'
import { RootState } from '../../store/state'
// import styles from './Suggestions.module.scss'
import { GeneList } from '../GeneList'
import { suggest, Suggestion } from '../../lib/suggestions'
import { SCORE_YYGGGG } from '../../lib/evaluate'
import { FlexCard } from '../FlexCard'

const { Panel } = Collapse

interface Props {
  clones: Clone[]
}

const SuggestionsComponent: FC<Props> = ({ clones }) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])

  useEffect(() => {
    if (clones.length > 0) {
      setSuggestions(
        suggest(
          clones.map((c) => c.genes),
          SCORE_YYGGGG
        )
      )
    }
  }, [clones])

  return (
    <FlexCard title="Suggested crossbreeds">
      {suggestions.length > 0 ? (
        <Collapse ghost>
          {suggestions.map((suggestion, i) => (
            <Panel
              key={i}
              header={<GeneList size="small" genes={suggestion.result} />}
            >
              <List
                size="small"
                dataSource={suggestion.clones}
                renderItem={(clone) => (
                  <List.Item>
                    <GeneList size="small" genes={clone} />
                  </List.Item>
                )}
              />
              <hr />
              <List size="small">
                <List.Item>
                  <GeneList size="small" genes={suggestion.result} />
                </List.Item>
              </List>
            </Panel>
          ))}
        </Collapse>
      ) : (
        <Empty description="No suggestions at this time" />
      )}
    </FlexCard>
  )
}

const mapStateToProps = (state: RootState) => ({
  clones: state.clones.pages[state.pages.activePage].inventory,
})

export const Suggestions = connect(mapStateToProps)(SuggestionsComponent)
