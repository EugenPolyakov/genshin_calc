import React from "react";
import "../../../css/Components/Artifact.css"

import { ArtifactSetIcon } from "./Icons";
import { UI } from "../../ui";
import { formatStat } from "../Utils";
export function ArtifactList(props) {
    let items = [];

    for (let item of props.items) {
        let hash = item.getHash();
        let realArt = UI.Layout.app.storage.artifacts.getByHash(hash);
        items.push(
            <ArtifactListItem
                key={hash}
                hash={hash}
                art={item}
                locked={realArt ? realArt.isLocked() : false }
                onLock={props.onLock}
                showLockCallback={props.showLockCallback}
                charIcons={props.savedHashes ? props.savedHashes[hash] : null}
            />
        );
    }

    return (
        <div className="artifact-list">
            {items}
            <div/><div/><div/><div/><div/><div/>
        </div>
    );
}

export function ArtifactPoolList(props) {
    let items = [];

    for (let item of props.items) {
        items.push(
            <div key={item.hash} className={item.hidden ? 'hidden' : ''}>
                <ArtifactListItem
                    hash={item.hash}
                    highlightStat={props.highlightStat}
                    art={item.art}
                    locked={item.art.isLocked()}
                    equipped={props.equippedHashes.includes(item.hash)}
                    charIcons={props.savedHashes[item.hash]}
                    onClick={props.onClick}
                    onEdit={props.onEdit}
                    onDelete={props.onDelete}
                    onLock={props.onLock}
                    onOver={props.onOver}
                />
            </div>
        );
    }

    return (
        <div className="artifact-list">
            {items}
            <div/><div/><div/><div/><div/><div/>
        </div>
    );
}

export class ArtifactListItem extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.hash != nextProps.hash
            || this.props.locked != nextProps.locked
            || this.props.equipped != nextProps.equipped
            || this.props.charIcons != nextProps.charIcons
            || this.props.highlightStat != nextProps.highlightStat
        ;
    }

    isHighlight(stat) {
        return stat == this.props.highlightStat;
    }

    getButtons() {
        return (
            <ArtifactListItemButtons
                art={ this.props.art }
                locked={ this.props.locked }
                onClick={ this.props.onClick }
                onEdit={ this.props.onEdit }
                onDelete={ this.props.onDelete }
                onLock={ this.props.onLock }
                showLockCallback={ this.props.showLockCallback }
            />
        );
    }

    render() {
        let art = this.props.art;
        let substats = [];
        let classes = ['artifact-list-box', 'border-rarity-' + art.getRarity()];

        if (this.props.equipped) {
            classes.push('equipped');
        } else if (this.props.locked) {
            classes.push('locked');
        }

        if (this.props.hidden) {
            classes.push('hidden');
        }

        for (let value of art.getSubStats() )
        {
            let stat = value.stat.replace('_percent', '');
            substats.push(
                <div key={ value.stat } className={ 'substat' + (this.isHighlight(value.stat, value.value) ? ' highlight' : '') + (value.unactivated ? ' unactivated' : '')}>
                    <span className="stat">{UI.Lang.get('stat_mini.'+ stat)}</span>
                    <span className="value">{ formatStat(value.stat, value.value, {signed: false})}</span>
                </div>
            );
        }

        let statOriginal = art.getMainStat()
        let stat = statOriginal.replace('_percent', '');

        return (
            <div
                className={classes.join(' ')}
                onClick={ this.props.onClick ? () => this.props.onClick(art) : undefined }
                onMouseOver={(e) => {
                    if (this.props.onOver) {
                        UI.TooltipArtifact.updatePosition(e);
                    }
                }}
                onMouseEnter={ () => this.props.onOver ? this.props.onOver(art) : ''}
                onMouseLeave={ () => UI.TooltipArtifact.hide()}
            >
                <div className="line">
                    <ArtifactSetIcon size={60} set={art.getSetName()} slot={art.getSlot()} />
                    { !art.isValid() ? <div className="invalid" data-tooltip={ this.props.tooltip }></div> : null}
                    <div className="main">
                        { this.getButtons() }
                        <div className="main-stat">
                            {UI.Lang.get('stat_short.'+ stat)}
                        </div>
                        <div className={ 'main-stat' + (this.isHighlight(statOriginal, art.getMainStatValue()) ? ' highlight' : '')}>
                            <span className="main-value">
                                { formatStat(statOriginal, art.getMainStatValue(), {signed: true})}
                            </span>
                            (+{art.getLevel()})
                        </div>
                    </div>
                    <ArtifactCharIcons items={this.props.charIcons} />
                </div>
                {substats}
            </div>
        );
    }
}

function ArtifactCharIcons(props) {
    let icons = props.items || [];
    if (!icons.length) {
        return '';
    }

    let items = [];

    for (let i = 0; i < icons.length; ++i) {
        let icon = icons[i];
        if (i == 3) {
            break;
        }

        items.push(
            <div key={'icon'+ i} className={'equipped item-icon icon-24 char-'+ (i+1)}>
                <div className={'sprite sprite-char sprite-24 ' + icon} />
            </div>
        );
    }

    return items;
}

function ArtifactListItemButtons(props) {
    if (!props.onEdit && !props.onDelete && !props.onLock) {
        return null;
    }

    let showLocking = !!props.onLock;
    if (props.showLockCallback && !props.showLockCallback(props.art)) {
        showLocking = false;
    }

    return (
        <div className="buttons" onClick={(e) => {
            e.preventDefault()
            e.stopPropagation();
        }}>
            {props.onEdit ? <div
                className="button edit"
                data-tooltip={UI.Lang.get('tooltip.artifact_edit')}
                onClick={() => props.onEdit(props.art)}
            /> : ''}
            {props.onDelete ? <div
                className="button delete"
                data-tooltip={UI.Lang.get('tooltip.artifact_delete')}
                onClick={() => props.onDelete(props.art)}
            /> : ''}
            {showLocking ? (props.locked ?
                <div
                    className="button locked"
                    data-tooltip={UI.Lang.get('tooltip.artifact_unlock')}
                    onClick={() => props.onLock(props.art, false)}
                />
                :
                <div
                    className="button unlocked"
                    data-tooltip={UI.Lang.get('tooltip.artifact_lock')}
                    onClick={() => props.onLock(props.art, true)}
                />
            ) : ''}
        </div>
    );
}
